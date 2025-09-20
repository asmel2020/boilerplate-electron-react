import { ipcRenderer } from "electron";

export const BookPreload = {
  consultBook: (link: string) => ipcRenderer.invoke("book:consult", link),
  findAllBooks: () => ipcRenderer.invoke("book:findAll"),
  downloadBook: (id: string) => ipcRenderer.invoke("book:download", id),
  redownloadBook: (id: string) => ipcRenderer.invoke("book:redownload", id),
};
