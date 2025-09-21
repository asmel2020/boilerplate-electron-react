import { db } from "../db";
import { chapters, books } from "../schema";
import { eq } from "drizzle-orm";

export async function resetCapitulosDownloaded(id: string) {
  // 1. Actualizar capítulos
  const updatedChapters = await db
    .update(chapters)
    .set({ isDownloaded: false })
    .where(eq(chapters.bookId, id))
    .returning({
      id: chapters.id,
      titulo: chapters.titulo,
      urlExternal: chapters.urlExternal,
      isDownloaded: chapters.isDownloaded,
      bookId: chapters.bookId,
    });

  if (updatedChapters.length === 0) {
    return [];
  }

  // 2. Buscar título del libro (solo una vez)
  const [book] = await db
    .select({ titulo: books.titulo })
    .from(books)
    .where(eq(books.id, id));

  // 3. Reconstruir resultado al estilo Prisma
  return updatedChapters.map((c) => ({
    ...c,
    book: {
      titulo: book?.titulo ?? null,
    },
  }));
}
