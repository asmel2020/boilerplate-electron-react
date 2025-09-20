import { ipcRenderer } from "electron";

export const CommonPreload = {
  chooseFolder: () => ipcRenderer.invoke("file:chooseFolder"),
};
