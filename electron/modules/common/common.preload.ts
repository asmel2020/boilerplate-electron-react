import { ipcRenderer } from "electron";

export const CommonPreload = {
  chooseFolder: () => ipcRenderer.invoke("file:chooseFolder"),
  getPath: () => ipcRenderer.invoke("file:getPath"),
};
