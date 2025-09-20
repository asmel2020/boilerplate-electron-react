export {};

declare global {
  interface Window {
    api: {
      consultBook: (link: string) => Promise<{
        titulo: string;
        autor: string;
        capitulos: number;
      }>;
      findAllBooks: () => Promise<
        ({
          capitulos: {
            urlExternal: string;
            titulo: string;
            capituloNum: number;
            tituloAttr: string | null;
            isDownloaded: boolean;
          }[];
          author: {
            urlExternal: string | null;
            name: string;
          } | null;
        } & {
          id: string;
          urlExternal: string;
          portada: string | null;
          titulo: string;
          tipo: string | null;
          estado: string | null;
          ultimaActualizacion: Date | null;
          descripcion: string | null;
          createdAt: Date;
          updatedAt: Date;
          authorId: string | null;
        })[]
      >;
    };
  }
}
