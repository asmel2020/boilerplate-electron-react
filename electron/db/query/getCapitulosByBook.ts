import { db } from "../db";
import { chapters, books } from "../schema";
import { eq } from "drizzle-orm";

export async function getCapitulosByBook(id: string) {
  const capitulos = await db
    .select({
      id: chapters.id,
      urlExternal: chapters.urlExternal,
      titulo: chapters.titulo,
      isDownloaded: chapters.isDownloaded,
      bookTitulo: books.titulo, // 👈 traemos el título del libro
    })
    .from(chapters)
    .leftJoin(books, eq(chapters.bookId, books.id))
    .where(eq(chapters.bookId, id));

  // 🔹 Reconstruir formato Prisma-like
  return capitulos.map((c) => ({
    id: c.id,
    urlExternal: c.urlExternal,
    titulo: c.titulo,
    isDownloaded: c.isDownloaded,
    book: {
      titulo: c.bookTitulo,
    },
  }));
}
