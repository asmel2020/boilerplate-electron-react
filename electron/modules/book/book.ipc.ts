import { BrowserWindow, IpcMain } from "electron";
import {
  consultBookLink,
  findAllBook,
  downloadBook,
  redownloadBook,
} from "./book.services";

export const BookIpcHandlers = (ipcMain: IpcMain, _: BrowserWindow | null) => {
  ipcMain.handle("book:consult", async (_, link: string) => {
    return await consultBookLink(link);
  });

  ipcMain.handle("book:findAll", async () => {
    return await findAllBook();
  });

  ipcMain.handle("book:download", async (_, id: string) => {
    return downloadBook(id);
  });
  ipcMain.handle("book:redownload", async (_, id: string) => {
    return redownloadBook(id);
  });
};
