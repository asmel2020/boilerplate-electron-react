import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

// -------------------------
// Autor
// -------------------------
export const authors = sqliteTable("authors", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  name: text("name").notNull().unique(),

  urlExternal: text("url_external").unique(),
});

// -------------------------
// Libros
// -------------------------
export const books = sqliteTable("books", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  urlExternal: text("url_external").notNull().unique(),

  portada: text("portada"),

  titulo: text("titulo").notNull(),

  tipo: text("tipo"),

  estado: text("estado"),

  ultimaActualizacion: integer("ultima_actualizacion", { mode: "timestamp" }),

  descripcion: text("descripcion"),

  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  // relación con author
  authorId: text("author_id").references(() => authors.id),
});

// -------------------------
// Capítulos
// -------------------------
export const chapters = sqliteTable("chapters", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),

  capituloNum: integer("capitulo_num").default(0).notNull(),

  titulo: text("titulo").notNull(),

  urlExternal: text("url_external").notNull().unique(),

  localPath: text("local_path"),

  tituloAttr: text("titulo_attr"),

  isDownloaded: integer("is_downloaded", { mode: "boolean" })
    .default(false)
    .notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  // relación con book (Cascade delete)
  bookId: text("book_id")
    .notNull()
    .references(() => books.id, { onDelete: "cascade" }),
});
