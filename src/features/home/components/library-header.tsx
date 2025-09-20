import { Library, Heart, TrendingUp } from "lucide-react";

interface LibraryHeaderProps {
  totalBooks: number;
  favoriteBooks: number;
  trendingBooks: number;
}

export function LibraryHeader({
  totalBooks,
  favoriteBooks,
  trendingBooks,
}: LibraryHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-xl p-8 mb-8 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Library className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Biblioteca Digital</h1>
          </div>
          <p className="text-blue-100 text-lg">
            Descubre y explora nuestra colección de libros cuidadosamente
            seleccionada
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Library className="w-5 h-5" />
            <span className="font-semibold">Total de Libros</span>
          </div>
          <div className="text-2xl font-bold">{totalBooks}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Favoritos</span>
          </div>
          <div className="text-2xl font-bold">{favoriteBooks}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Tendencias</span>
          </div>
          <div className="text-2xl font-bold">{trendingBooks}</div>
        </div>
      </div>
    </div>
  );
}
