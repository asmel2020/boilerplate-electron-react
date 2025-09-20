import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Loader2,
  Link,
  CheckCircle,
  AlertCircle,
  Book,
  User,
  Hash,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface BookInfo {
  title: string;
  author: string;
  chapters: number;
}

interface AddBookDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: () => void;
}

export function AddBookDialog({
  isOpen,
  onClose,
  onAddBook,
}: AddBookDialogProps) {
  const [url, setUrl] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [bookInfo, setBookInfo] = useState<BookInfo | null>(null);
  const [isValidated, setIsValidated] = useState(false);

  const validateUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleValidateLink = async () => {
    if (!url.trim()) {
      setValidationError("Por favor, ingresa un enlace válido");
      return;
    }

    if (!validateUrl(url)) {
      setValidationError("El enlace ingresado no es válido");
      return;
    }

    setIsValidating(true);
    setValidationError("");
    setBookInfo(null);
    setIsValidated(false);

    try {
      const data = await window.api.consultBook(url);

      setBookInfo({
        author: data.autor,
        title: data.titulo,
        chapters: data.capitulos,
      });
      onAddBook();
      setIsValidated(true);
    } catch (error) {
      setValidationError(
        error instanceof Error ? error.message : "Error al procesar el enlace"
      );
    } finally {
      setIsValidating(false);
    }
  };

  const handleClose = () => {
    setUrl("");
    setBookInfo(null);
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
            Agregar Libro desde Enlace
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* URL Input */}
          <div className="space-y-2">
            <Label htmlFor="book-url">Enlace del libro</Label>
            <div className="flex gap-2">
              <Input
                id="book-url"
                placeholder="https://ejemplo.com/libro"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isValidating}
                className="flex-1"
              />
              <Button
                onClick={handleValidateLink}
                disabled={isValidating || !url.trim()}
                size="default"
              >
                {isValidating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Validar"
                )}
              </Button>
            </div>
          </div>

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
          {isValidated && bookInfo && (
            <div className="space-y-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  ¡Información extraída exitosamente!
                </AlertDescription>
              </Alert>

              <Card>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Book className="w-4 h-4" />
                    <span className="font-medium">Información del libro:</span>
                  </div>

                  <div className="space-y-2 pl-6">
                    <div className="flex items-start gap-2">
                      <span className="font-medium text-gray-700 min-w-[60px]">
                        Título:
                      </span>
                      <span className="text-gray-900">{bookInfo.title}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="font-medium text-gray-700 min-w-[60px]">
                        Autor:
                      </span>
                      <span className="text-gray-900">{bookInfo.author}</span>
                    </div>

                    <div className="flex items-start gap-2">
                      <Hash className="w-4 h-4 text-gray-500 mt-0.5" />
                      <span className="font-medium text-gray-700 min-w-[60px]">
                        Capítulos:
                      </span>
                      <span className="text-gray-900">{bookInfo.chapters}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
