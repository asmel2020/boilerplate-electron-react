import Store from "electron-store";

const store = new Store();

export function savePath(ruta: string) {
  store.set("rutaArchivos", ruta);
}

export function getPath(): string | undefined {
  return store.get("rutaArchivos") as string | undefined;
}
