import { ipcRenderer } from "electron";

export const BookPreload = {
  consultBook: (link: string) => ipcRenderer.invoke("book:consult", link),
  findAllBooks: () => ipcRenderer.invoke("book:findAll"),
};
