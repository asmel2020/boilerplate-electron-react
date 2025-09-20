import { Book } from "@/types/book";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

import { Separator } from "@/components/ui/separator";
import { BookOpen, CheckCircle, DownloadCloudIcon } from "lucide-react";

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookDetailModal({
  book,
  isOpen,
  onClose,
}: BookDetailModalProps) {
  if (!book) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className=" max-h-[90vh] overflow-y-auto w-full max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Detalles del Libro
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-4">
          {/* Book Cover */}
          <div className="space-y-4">
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 shadow-lg">
              <img
                src={book.coverUrl}
                alt={`Portada de ${book.title}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Book Information */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                  {book.title}
                </h1>
              </div>
              <p className="text-xl text-gray-600 mb-4">por {book.author}</p>

              <Badge variant="outline" className="mb-4">
                {book.genre}
              </Badge>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {book.description}
              </p>
            </div>
            <Separator />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Información del libro
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <BookOpen className="w-5 h-5" />
                    <span>Capitulos : {book.caps} </span>
                  </div>
                </div>
              </div>
            </div>
            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Capitulos</h3>

              <div className="space-y-3">
                {book.capitulos.map((capitulo) => (
                  <div
                    key={capitulo.capituloNum}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>{capitulo.titulo}</span>
                    {capitulo.isDownloaded ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <DownloadCloudIcon className="w-5 h-5 text-blue-600 cursor-pointer" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
