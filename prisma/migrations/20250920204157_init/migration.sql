-- CreateTable
CREATE TABLE "Author" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "urlExternal" TEXT
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "urlExternal" TEXT NOT NULL,
    "portada" TEXT,
    "titulo" TEXT NOT NULL,
    "tipo" TEXT,
    "estado" TEXT,
    "ultimaActualizacion" DATETIME,
    "descripcion" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorId" TEXT,
    CONSTRAINT "Book_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Capitulo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "capituloNum" INTEGER NOT NULL DEFAULT 0,
    "titulo" TEXT NOT NULL,
    "urlExternal" TEXT NOT NULL,
    "tituloAttr" TEXT,
    "isDownloaded" BOOLEAN NOT NULL DEFAULT false,
    "bookId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Capitulo_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Author_name_key" ON "Author"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Author_urlExternal_key" ON "Author"("urlExternal");

-- CreateIndex
CREATE UNIQUE INDEX "Book_urlExternal_key" ON "Book"("urlExternal");

-- CreateIndex
CREATE UNIQUE INDEX "Capitulo_urlExternal_key" ON "Capitulo"("urlExternal");
