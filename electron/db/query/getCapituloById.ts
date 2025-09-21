import { db } from "../db";
import { chapters } from "../schema";
import { eq } from "drizzle-orm";

export async function getCapituloById(id: string) {
  const [capitulo] = await db
    .select({
      id: chapters.id,
      localPath: chapters.localPath,
    })
    .from(chapters)
    .where(eq(chapters.id, id))
    .limit(1);

  return capitulo ?? null; // Prisma devuelve null si no encuentra
}
