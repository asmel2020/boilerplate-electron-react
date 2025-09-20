import { BrowserWindow, dialog, IpcMain } from "electron";
import { savePath } from "../../utils/storage";

export const CommonIpcHandlers = (
  ipcMain: IpcMain,
  win: BrowserWindow | null
) => {
  // Elegir carpeta
  ipcMain.handle("file:chooseFolder", async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog(win as any, {
      title: "Elige una carpeta",
      properties: ["openDirectory"],
    });

    if (canceled) return null;

    savePath(filePaths[0]);
    return filePaths[0];
  });
};
