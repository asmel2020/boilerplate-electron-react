import { IpcMain } from "electron";
import { consultBookLink, findAllBook } from "./book.services";

export const BookConsultIpcHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle("book:consult", async (_, link: string) => {
    return await consultBookLink(link);
  });
};

export const BookFindAllIpcHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle("book:findAll", async () => {
    return await findAllBook();
  });
};
