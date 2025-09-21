import { useState } from "react";
import { BookCard } from "./components/book-card";
import { BookDetailModal } from "./components/book-detail-modal";
import { EmptyState } from "./components/empty-state";
import { LibraryHeader } from "./components/library-header";
import { Button } from "@/components/ui/button";
import { Folder, Plus } from "lucide-react";
import { AddBookDialog } from "./components/add-book-dialog";
import { useFindAllBook } from "@/hook/find-all-book";
import { Book } from "@/types/book";
import { DownloadBookDialog } from "./components/download-book-dialog";
import { BookReader } from "./components/book-reader";
import { useGetPath } from "@/hook/get-path";
import Loading from "@/components/loading";
import { AddPathDialog } from "./components/add-path";

export function HomePage() {
  const { getPathQuery } = useGetPath();
  const { findAllBookQuery } = useFindAllBook();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddBookDialogOpen, setIsAddBookDialogOpen] = useState(false);
  const [isDownloadBookDialogOpen, setIsDownloadBookDialogOpen] =
    useState(false);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleViewDetails = (book: Book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };
  const handleDownload = async (book: Book) => {
    setSelectedBook(book);
    setIsDownloadBookDialogOpen(true);
  };
  const handleReadBook = (book: Book) => {
    setSelectedBook(book);
    setIsReaderOpen(true);
  };
  if (!getPathQuery.data || !findAllBookQuery.data) return <Loading />;

  if (!getPathQuery.data.path) {
    return (
      <AddPathDialog
        isOpen={true}
        onClose={async () => {
          await getPathQuery.refetch();
        }}
      />
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto p-6">
        <LibraryHeader totalBooks={1} favoriteBooks={2} trendingBooks={3} />
        <div className="flex justify-end mb-6 gap-2">
          <Button
            onClick={() => window.api.common.chooseFolder()}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Folder className="w-4 h-4" />
            Cambiar Ruta
          </Button>
          <Button
            onClick={() => setIsAddBookDialogOpen(true)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Agregar Libro
          </Button>
        </div>
        <div className="flex justify-end mb-6"></div>
        {!!findAllBookQuery.data && findAllBookQuery.data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {findAllBookQuery.data.map((book) => (
              <BookCard
                key={book.id}
                book={{
                  id: book.id,
                  title: book.titulo,
                  author: book.author?.name || "Desconocido",
                  genre: "book.tipo",
                  description: book.descripcion || "Sin descripción disponible",
                  coverUrl: book.portada || "https://via.placeholder.com/150",
                  caps: book.capitulos.length,
                  capitulos: book.capitulos,
                }}
                onViewDetails={handleViewDetails}
                onDownload={handleDownload}
                onReadBook={handleReadBook}
              />
            ))}
          </div>
        ) : (
          <EmptyState hasSearchTerm={false} />
        )}
      </div>
      <BookDetailModal
        book={selectedBook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <AddBookDialog
        isOpen={isAddBookDialogOpen}
        onClose={() => setIsAddBookDialogOpen(false)}
        onAddBook={async () => {
          await findAllBookQuery.refetch();
        }}
      />
      <DownloadBookDialog
        book={selectedBook}
        isOpen={isDownloadBookDialogOpen}
        onClose={() => setIsDownloadBookDialogOpen(false)}
        onAddBook={async () => {
          await findAllBookQuery.refetch();
        }}
      />

      <BookReader
        book={selectedBook}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
      />
    </div>
  );
}
