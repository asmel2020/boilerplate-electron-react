import { db } from "../db";
import { books, authors, chapters } from "../schema";
import { eq, asc } from "drizzle-orm";

export async function getBooks() {
  // 1. Libros + autor
  const librosConAutor = await db
    .select({
      id: books.id,
      titulo: books.titulo,
      urlExternal: books.urlExternal, // ojo: usa el nombre que definiste en schema
      portada: books.portada,
      tipo: books.tipo,
      estado: books.estado,
      ultimaActualizacion: books.ultimaActualizacion,
      descripcion: books.descripcion,
      createdAt: books.createdAt,
      updatedAt: books.updatedAt,
      authorName: authors.name,
      authorUrl: authors.urlExternal,
    })
    .from(books)
    .leftJoin(authors, eq(books.authorId, authors.id));

  // 2. Capítulos de todos los libros
  const capitulosPorLibro = await db
    .select({
      id: chapters.id,
      capituloNum: chapters.capituloNum,
      titulo: chapters.titulo,
      urlExternal: chapters.urlExternal,
      tituloAttr: chapters.tituloAttr,
      isDownloaded: chapters.isDownloaded,
      bookId: chapters.bookId,
    })
    .from(chapters)
    .orderBy(asc(chapters.capituloNum));

  // 3. Armar respuesta estilo Prisma
  const result = librosConAutor.map((book) => ({
    ...book,
    author: {
      name: book.authorName,
      urlExternal: book.authorUrl,
    },
    capitulos: capitulosPorLibro.filter((c) => c.bookId === book.id),
  }));

  return result;
}
