import { db } from "../db";
import { chapters } from "../schema";
import { eq } from "drizzle-orm";

export async function markChapterAsDownloaded(
  capituloId: string,
  fileName: string
) {
  const [updated] = await db
    .update(chapters)
    .set({
      isDownloaded: true,
      localPath: fileName,
      updatedAt: new Date(), // 👈 si quieres simular el @updatedAt de Prisma
    })
    .where(eq(chapters.id, capituloId))
    .returning();

  return updated;
}
