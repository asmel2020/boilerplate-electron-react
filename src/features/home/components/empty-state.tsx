import { Search, BookX } from "lucide-react";

interface EmptyStateProps {
  hasSearchTerm: boolean;
}

export function EmptyState({ hasSearchTerm }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
        {hasSearchTerm ? (
          <Search className="w-12 h-12 text-gray-400" />
        ) : (
          <BookX className="w-12 h-12 text-gray-400" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {hasSearchTerm
          ? "No se encontraron libros"
          : "No hay libros disponibles"}
      </h3>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        {hasSearchTerm
          ? "Prueba ajustando tus filtros o términos de búsqueda para encontrar lo que buscas."
          : "Parece que no hay libros en la biblioteca en este momento."}
      </p>
    </div>
  );
}
