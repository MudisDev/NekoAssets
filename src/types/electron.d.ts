export { };

export interface configuracion {
  clave: string;
  directorioCheckpoints: string;
  directorioLoras: string;
}

export interface ruta {
  ruta: string;
}

declare global {
  interface Window {
    electronAPI: {
      obtenerArchivos: (rutaAssets: ruta) => Promise<string[]>;
      obtenerConfiguracion: () => Promise<configuracion>;
      guardarConfiguracion: (configJson: configuracion) => Promise<void>;
      seleccionarDirectorio: () => Promise<string[] | null>;
      //obtenerImagen: (rutaArchivo: string) => Promise<string[]>;
      obtenerUrlArchivo: (rutaArchivo: string) => Promise<string>;
    };
  }
}