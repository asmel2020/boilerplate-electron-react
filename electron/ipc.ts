import { ipcMain } from "electron";
import {
  TiktokConnectIpcHandlers,
  tiktokDisconnectIpcHandlers,
} from "./modules/tiktok/tiktok.ipc";

export default function registerIpcHandlers() {
  TiktokConnectIpcHandlers(ipcMain);
  tiktokDisconnectIpcHandlers(ipcMain);
}
