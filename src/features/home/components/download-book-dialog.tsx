import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Link,
  CheckCircle,
  AlertCircle,
  Hash,
  Download,
  Book as BookIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Book } from "@/types/book";

interface BookInfo {
  title: string;
  author: string;
  chapters: number;
}

interface AddBookDialogProps {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
  onAddBook: () => void;
}

export function DownloadBookDialog({
  isOpen,
  book,
  onClose,
  onAddBook,
}: AddBookDialogProps) {
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");

  const [isValidated, setIsValidated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadBook = async () => {
    if (!book) return;
    try {
      setIsDownloading(true);
      await window.api.book.downloadBook(book.id);
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
    }
  };

  const reDownloadBook = async () => {
    if (!book) return;
    try {
      setIsDownloading(true);
      await window.api.book.redownloadBook(book.id);
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      return;
    }
  };

  const handleClose = () => {
    if (isDownloading) return;
    setIsValidated(false);
    setValidationError("");
    setIsValidating(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Link className="w-5 h-5" />
            Descargar Libro
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Loading State */}
          {isValidating && (
            <Alert>
              <Loader2 className="w-4 h-4 animate-spin" />
              <AlertDescription>
                Validando enlace y extrayendo información del libro...
              </AlertDescription>
            </Alert>
          )}

          {/* Error State */}
          {validationError && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>{validationError}</AlertDescription>
            </Alert>
          )}

          {/* Success State - Book Information */}

          <div className="space-y-4">
            {isValidated && (
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ¡Información extraída exitosamente!
                </AlertDescription>
              </Alert>
            )}

            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <BookIcon className="w-4 h-4" />
                  <span className="font-medium">
                    Información de la descarga:
                  </span>
                </div>

                <div className="space-y-2 pl-6">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700 min-w-[60px]">
                      Descargados:
                    </span>
                    <span className="text-gray-900">
                      {!!book &&
                        book.capitulos
                          .filter((capitulo) => capitulo.isDownloaded)
                          .length.toString()}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-blue-600 cursor-pointer" />
                    <span className="font-medium text-gray-700 min-w-[60px]">
                      Por Descargar:
                    </span>
                    <span className="text-gray-900">
                      {" "}
                      {!!book &&
                        book.capitulos
                          .filter((capitulo) => !capitulo.isDownloaded)
                          .length.toString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isDownloading}
          >
            Cerrar
          </Button>
          <Button
            variant="outline"
            onClick={reDownloadBook}
            disabled={isDownloading}
          >
            Reprocesar
          </Button>
          <Button onClick={downloadBook} disabled={isDownloading}>
            Descargar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
