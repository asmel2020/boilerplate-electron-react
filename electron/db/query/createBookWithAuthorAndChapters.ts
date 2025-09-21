import { db } from "../db";
import { authors, books, chapters } from "../schema";
import { eq } from "drizzle-orm";

export async function createBookWithAuthorAndChapters({
  link,
  portada,
  titulo,
  tipo,
  estado,
  ultimaActualizacion,
  descripcion,
  autor,
  autors, // <- asumo que aquí viene el objeto con `url`
  capitulos,
}: {
  link: string;
  portada?: string;
  titulo: string;
  tipo?: string;
  estado?: string;
  ultimaActualizacion?: string;
  descripcion?: string;
  autor: string;
  autors: { url?: string };
  capitulos: {
    capituloNum: number;
    titulo: string;
    urlExternal: string;
    localPath?: string;
    tituloAttr?: string;
    isDownloaded?: boolean;
  }[];
}) {
  // 1. Buscar si ya existe el autor
  let [author] = await db.select().from(authors).where(eq(authors.name, autor));

  // 2. Si no existe, crearlo
  if (!author) {
    [author] = await db
      .insert(authors)
      .values({
        name: autor,
        urlExternal: autors.url,
      })
      .returning();
  }

  // 3. Crear el libro
  const [book] = await db
    .insert(books)
    .values({
      urlExternal: link,
      portada,
      titulo,
      tipo,
      estado,
      ultimaActualizacion: ultimaActualizacion
        ? new Date(ultimaActualizacion) // ✅ pasar Date, no number
        : null,
      descripcion,
      authorId: author.id,
    })
    .returning();

  // 4. Insertar capítulos (bulk insert)
  if (capitulos.length > 0) {
    await db.insert(chapters).values(
      capitulos.map((values) => ({
        bookId: book.id,
        titulo: values.titulo,
        urlExternal: values.urlExternal,
        tituloAttr: values.tituloAttr,
        isDownloaded: false,
        capituloNum: values.capituloNum,
      }))
    );
  }

  return { book, author };
}
