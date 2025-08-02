import { ipcRenderer } from "electron";

export const tiktokPreload = {
  tiktokConnect: (username: string) =>
    ipcRenderer.invoke("start:tiktok", username),
  tiktokDisconnect: () => ipcRenderer.invoke("tiktok:disconnect"),
};
