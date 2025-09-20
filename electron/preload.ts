import { contextBridge } from "electron";
import { BookPreload } from "./modules/book/book.preload";
import { CommonPreload } from "./modules/common/common.preload";

contextBridge.exposeInMainWorld("api", {
  book: {
    ...BookPreload,
  },
  common: {
    ...CommonPreload,
  },
});
