export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverUrl: string;
  caps: number;
  capitulos: Cap[];
}

export interface Cap {
  id: string;
  urlExternal: string;
  titulo: string;
  capituloNum: number;
  tituloAttr: string | null;
  isDownloaded: boolean;
}
