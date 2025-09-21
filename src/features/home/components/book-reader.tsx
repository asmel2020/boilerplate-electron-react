import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import { BookOpen } from "lucide-react";
import { Book } from "@/types/book";
import { cn } from "@/lib/utils";
import { useReadCapBook } from "@/hook/read-cap-book";

interface BookReaderProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookReader({ book, isOpen, onClose }: BookReaderProps) {
  const { readBookQuery } = useReadCapBook();
  const [capComplete, setCapComplete] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const goToPage = (pageNumber: number) => {
    if (!book) return;
    readBookQuery.setCapId(book.capitulos[pageNumber - 1].id);
    setCurrentPage(pageNumber);
  };

  const handleClose = () => {
    setCurrentPage(1);
    onClose();
  };

  useEffect(() => {
    if (book) {
      setCapComplete(
        book.capitulos.filter((capitulo) => capitulo.isDownloaded).length
      );
      readBookQuery.setCapId(book.capitulos[0].id);
    }
  }, [book]);
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] p-0 gap-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <div>
                <DialogTitle className="text-xl font-bold text-gray-900">
                  {book?.title || ""}
                </DialogTitle>
                <p className="text-sm text-gray-600 mt-1">
                  por {book?.author || ""}
                </p>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* Table of Contents Sidebar */}
          <div className="w-40 border-r bg-gray-50 flex flex-col ">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900 mb-2">Contenido</h3>
              <Badge variant="secondary" className="text-xs">
                Capitulos disponibles {capComplete}
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-2">
                {!!book &&
                  book?.capitulos.map((page) => {
                    if (!page.isDownloaded) return null;
                    return (
                      <button
                        key={page.capituloNum}
                        onClick={() => goToPage(page.capituloNum)}
                        className={cn(
                          "w-full text-left p-3 rounded-lg mb-2 transition-colors",
                          "hover:bg-white hover:shadow-sm",
                          currentPage === page.capituloNum
                            ? "bg-blue-100 text-blue-900 border border-blue-200"
                            : "text-gray-700"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-gray-500">
                            Titulo
                          </span>
                        </div>
                        <div className="text-sm font-medium line-clamp-2">
                          {page.titulo}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-0">
            {/* Content */}
            {!!readBookQuery.data && (
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-3xl mx-auto">
                  <div className="prose prose-lg max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-3xl font-bold text-gray-900 mb-6 leading-tight">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">
                            {children}
                          </h3>
                        ),
                        p: ({ children }) => (
                          <p className="text-gray-700 mb-4 leading-relaxed text-lg">
                            {children}
                          </p>
                        ),
                        blockquote: ({ children }) => (
                          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-6 bg-blue-50 italic text-gray-700">
                            {children}
                          </blockquote>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
                            {children}
                          </ol>
                        ),
                        li: ({ children }) => (
                          <li className="text-gray-700 leading-relaxed">
                            {children}
                          </li>
                        ),
                        code: ({ children, className }) => {
                          const isInline = !className;
                          if (isInline) {
                            return (
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                                {children}
                              </code>
                            );
                          }
                          return (
                            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                              {children}
                            </code>
                          );
                        },
                        strong: ({ children }) => (
                          <strong className="font-bold text-gray-900">
                            {children}
                          </strong>
                        ),
                        hr: () => <hr className="my-8 border-gray-300" />,
                      }}
                    >
                      {readBookQuery.data}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
