/* import { TikTokLiveConnection, WebcastEvent } from "tiktok-live-connector"; */
import * as cheerio from "cheerio";
import axios from "axios";

import { prisma } from "../../prisma/prismaClient";

// Recibir usuario desde el frontend

export const consultBookLink = async (
  link: string
): Promise<{
  titulo: string;
  autor: string;
  capitulos: number;
}> => {
  try {
    const { data: html } = await axios.get(link);

    const $ = cheerio.load(html);

    // Extraer título
    const titulo = $(".book-describe h1").text().trim();

    // Autor
    const autor = $(".book-describe p")
      .first()
      .text()
      .replace("作者︰", "")
      .trim();
    const autorEl = $(".book-describe p a");

    const autors: {
      nombre: string;
      url: string;
    } = {
      nombre: autorEl.text().trim(),
      url: `https://www.banxia.la${autorEl.attr("href")}`,
    };

    // Tipo
    const tipo = $(".book-describe p:contains('類型')")
      .text()
      .replace("類型︰", "")
      .trim();

    // Estado
    const estado = $(".book-describe p:contains('狀態')")
      .text()
      .replace("狀態︰", "")
      .trim();

    // Última actualización
    const ultimaActualizacion = $(".book-describe p:contains('最近更新')")
      .text()
      .replace("最近更新︰", "")
      .trim();

    // Descripción completa (con saltos de línea)
    const descripcion = $(".describe-html").text().replace(/\s+/g, " ").trim();

    const img = $(".book-img img");

    const portada = img.attr("data-original") || img.attr("src");

    const capitulos: {
      capituloNum: number;
      titulo: string;
      urlExternal: string;
      tituloAttr?: string;
    }[] = [];

    $(".book-list li a").each((i, el) => {
      capitulos.push({
        capituloNum: i + 1,
        titulo: $(el).text().trim(),
        urlExternal: `https://www.banxia.la${$(el).attr("href")}`,
        tituloAttr: $(el).attr("title"), // opcional
      });
    });
    await prisma.book.create({
      data: {
        urlExternal: link,
        portada,
        titulo,

        tipo,
        estado,
        ultimaActualizacion: ultimaActualizacion
          ? new Date(ultimaActualizacion)
          : null,
        descripcion,
        author: {
          connectOrCreate: {
            where: {
              name: autor,
            },
            create: {
              name: autor,
              urlExternal: autors.url,
            },
          },
        },
        capitulos: {
          createMany: {
            data: capitulos,
          },
        },
      },
    });

    /*  fs.writeFileSync(
      "descripcion.json",
      JSON.stringify({
        url: link,
        portada,
        titulo,
        autor,
        tipo,
        estado,
        ultimaActualizacion,

        descripcion,
        capitulos,
      })
    ); */

    return {
      titulo,
      autor,
      capitulos: capitulos.length,
    };
  } catch (error) {
    console.error("Error al consultar el enlace del libro:", error);
    throw new Error("No se pudo consultar el enlace del libro");
  }
};

export const findAllBook = async () => {
  const books = await prisma.book.findMany({
    include: {
      author: {
        select: {
          name: true,
          urlExternal: true,
        },
      },
      capitulos: {
        select: {
          capituloNum: true,
          titulo: true,
          urlExternal: true,
          tituloAttr: true,
          isDownloaded: true,
        },
        orderBy: {
          capituloNum: "asc",
        },
      },
    },
  });
  return books;
};
