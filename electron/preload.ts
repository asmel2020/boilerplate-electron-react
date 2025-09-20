import { contextBridge } from "electron";
import { BookPreload } from "./modules/book/book.preload";

contextBridge.exposeInMainWorld("api", {
  ...BookPreload,
});
