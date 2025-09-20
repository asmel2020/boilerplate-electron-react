import { ipcMain } from "electron";
import {
  BookConsultIpcHandlers,
  BookFindAllIpcHandlers,
} from "./modules/book/book.ipc";

export default function registerIpcHandlers() {
  BookConsultIpcHandlers(ipcMain);
  BookFindAllIpcHandlers(ipcMain);
}
