import { useEffect, useState } from "react";
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
  Download,
  Book as BookIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Book } from "@/types/book";
import { useSocketStore } from "@/store/socketStore";

interface AddBookDialogProps {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
  onAddBook?: () => void;
}

export function DownloadBookDialog({
  isOpen,
  book,
  onClose,
  onAddBook = () => {},
}: AddBookDialogProps) {
  const { connect, disconnect, socket } = useSocketStore();
  const [isValidating, setIsValidating] = useState(false);

  const [isValidated, setIsValidated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [downloadComplete, setDownloadComplete] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadFailed, setDownloadFailed] = useState(0);
  const downloadBook = async () => {
    if (!book) return;
    try {
      setIsDownloading(true);
      await window.api.book.downloadBook(book.id);
      onAddBook();
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
      onAddBook();
      setIsDownloading(false);
    } catch (error) {
      setIsDownloading(false);
      return;
    }
  };

  const handleClose = () => {
    if (isDownloading) return;
    setIsValidated(false);
    disconnect();
    setDownloadProgress(0);
    setDownloadComplete(0);
    setDownloadFailed(0);
    setIsValidating(false);
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      connect();
    } else {
      disconnect();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      connect();
    }

    return () => {
      /*  setIsLoading(false); */
      disconnect();
    };
  }, [connect, disconnect]);

  useEffect(() => {
    socket?.on(
      "download:process",
      (message: {
        downloadComplete: number;
        downloadPending: number;
        downloadFailed: number;
      }) => {
        setDownloadComplete(message.downloadComplete);
        setDownloadProgress(message.downloadPending);
        setDownloadFailed(message.downloadFailed);
      }
    );
    return () => {
      socket?.off("download:new");
      socket?.off("download:reprocess");
    };
  }, [socket]);

  useEffect(() => {
    if (!!book) {
      setDownloadComplete(
        book.capitulos.filter((capitulo) => capitulo.isDownloaded).length
      );
      setDownloadProgress(
        book.capitulos.filter((capitulo) => !capitulo.isDownloaded).length
      );
    }
  }, [book]);

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
          {downloadFailed > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="w-4 h-4" />
              <AlertDescription>
                Descargas Falladas {downloadFailed}
              </AlertDescription>
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
                    <BookIcon className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700 min-w-[60px]">
                      Total de Capítulos:
                    </span>
                    <span className="text-gray-900">
                      {book?.capitulos.length.toString() || "0"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-gray-700 min-w-[60px]">
                      Descargados:
                    </span>
                    <span className="text-gray-900">
                      {downloadComplete.toString()}
                    </span>
                  </div>

                  <div className="flex items-start gap-2">
                    <Download className="w-4 h-4 text-blue-600 cursor-pointer" />
                    <span className="font-medium text-gray-700 min-w-[60px]">
                      Por Descargar:
                    </span>
                    <span className="text-gray-900">
                      {downloadProgress.toString()}
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
