import { contextBridge } from "electron";
import { tiktokPreload } from "./modules/tiktok/tiktok.preload";

contextBridge.exposeInMainWorld("api", {
  ...tiktokPreload,
});
