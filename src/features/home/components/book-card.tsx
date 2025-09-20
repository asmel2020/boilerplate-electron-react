import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Book } from "@/types/book";

interface BookCardProps {
  book: Book;

  onViewDetails?: (book: Book) => void;
  onDownload?: (book: Book) => void;
}

export function BookCard({
  book,
  onDownload = () => {},
  onViewDetails = () => {},
}: BookCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white border-0 shadow-md">
      <div className="relative">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100">
          <img
            src={book.coverUrl}
            alt={`Portada de ${book.title}`}
            className={cn(
              "w-full h-full object-cover transition-all duration-300 group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
              {book.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{book.author}</p>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div>Capitulos {book.caps} </div>
          </div>

          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs">
              {book.genre}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDownload(book)}
              className="text-xs px-3"
            >
              Descargar
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(book)}
              className="text-xs px-3"
            >
              Ver detalles
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
