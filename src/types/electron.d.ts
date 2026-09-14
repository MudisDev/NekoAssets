export { };

export interface configuracion {
  clave: string;
  directorioCheckpoints: string;
  directorioLoras: string;
}

declare global {
  interface Window {
    electronAPI: {
      obtenerArchivos: () => Promise<string[]>;
      obtenerConfiguracion: () => Promise<configuracion>;
      guardarConfiguracion: (configJson: configuracion) => Promise<void>;
      seleccionarDirectorio: () => Promise<string[] | null>;
    };
  }
}