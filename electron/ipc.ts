import { BrowserWindow, ipcMain } from "electron";
import { BookIpcHandlers } from "./modules/book/book.ipc";
import { CommonIpcHandlers } from "./modules/common/common.ipc";

export default function registerIpcHandlers(win: BrowserWindow | null) {
  BookIpcHandlers(ipcMain, win);
  CommonIpcHandlers(ipcMain, win);
}
