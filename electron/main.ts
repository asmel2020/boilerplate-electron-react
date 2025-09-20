import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { env } from "../src/config/env";
import registerIpcHandlers from "./ipc";
import { initPrisma } from "./prisma/prismaClient";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

let win: BrowserWindow | null;

async function createWindow() {
  await initPrisma();
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    width: 1080,
    height: 710,
    autoHideMenuBar: true,
    /* resizable: false, // 🔥 Deshabilita el redimensionado
    fullscreenable: false, // (opcional) evita que se maximice
    maximizable: false, // (opcional) evita botón de maximizar
    minimizable: true, // puedes seguir permitiendo minimizar
 */
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
  // habilitar devtools
  if (env.MODE === "development") {
    win.webContents.openDevTools();
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  registerIpcHandlers(win);
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers(win);
});

// Manejar petición desde renderer
ipcMain.handle("save-file", async (_, data) => {
  const { canceled, filePath } = await dialog.showSaveDialog(win as any, {
    title: "Guardar archivo",
    defaultPath: "mis-datos.json", // nombre por defecto
    filters: [{ name: "JSON", extensions: ["json"] }],
  });

  return canceled ? null : filePath; // ⚡ aquí solo devuelves la ruta
});

ipcMain.handle("choose-folder", async (event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(win as any, {
    title: "Elige una carpeta",
    properties: ["openDirectory"],
  });

  return canceled ? null : filePaths[0]; // ⚡ devuelve solo la carpeta elegida
});
