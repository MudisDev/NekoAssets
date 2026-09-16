import { app, BrowserWindow, dialog, protocol } from 'electron'
import { createRequire } from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'
//--
import { ipcMain } from "electron";
import fs from "node:fs";
import { json } from 'node:stream/consumers';
//--
const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}
// --
ipcMain.handle("obtener-archivos", (event, rutaAssets) => {
  const response = fs.readdirSync(rutaAssets)
  return response;
});

ipcMain.handle("obtener-url-archivo", (event, rutaArchivo) => {
  return pathToFileURL(rutaArchivo).href;
});

ipcMain.handle("leer-configuracion", () => {
  const rutaConfig = path.join(process.env.APP_ROOT, "src/config/configuracion.json");
  const contenido = fs.readFileSync(rutaConfig, "utf-8");
  return JSON.parse(contenido);
});

ipcMain.handle("escribir-configuracion", (event, configJson) => {
  const rutaConfig = path.join(process.env.APP_ROOT, "src/config/configuracion.json");
  try {
    fs.writeFileSync(rutaConfig, JSON.stringify(configJson, null, 2));
    console.log('JSON saved.');
  } catch (err) {
    console.error(err);
  }
});
ipcMain.handle("seleccionar-directorio", () => {
  const seleccion = dialog.showOpenDialogSync({ defaultPath: process.env.APP_ROOT, properties: ['openDirectory'] });
  if (!seleccion)
    return null;
  return seleccion[0];
})

//--

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

protocol.registerSchemesAsPrivileged([
  {
    scheme: "nekoassets",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      corsEnabled: true
    }
  }
]);

app.whenReady().then(() => {

  protocol.handle("nekoassets", async (request) => {

    const url = new URL(request.url);

    const rutaArchivo = url.searchParams.get("path");

    console.log("PROTOCOLO -> ", rutaArchivo);

    if (!rutaArchivo) {
      return new Response("Ruta no especificada", {
        status: 400
      });
    }

    try {
      const archivo = await fs.promises.readFile(rutaArchivo);

      return new Response(archivo, {
        headers: {
          "Content-Type": "image/png"
        }
      });

    } catch (error) {

      console.error("Error cargando imagen:", error);

      return new Response("Archivo no encontrado", {
        status: 404
      });
    }
  });

  createWindow();
});
