import { IpcMain } from "electron";

import { tiktokConnect, tiktokDisconnect } from "./tiktok.services";

export const TiktokConnectIpcHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle("start:tiktok", async (_, username: string) => {
    return await tiktokConnect(username);
  });
};

export const tiktokDisconnectIpcHandlers = (ipcMain: IpcMain) => {
  ipcMain.handle("tiktok:disconnect", async () => {
    return await tiktokDisconnect();
  });
};
