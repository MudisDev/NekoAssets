import React, { useEffect, useState } from 'react'
import "../css/normalize.css";
import "../css/styles.css";
import { Navegacion } from '../components/Navegacion';
import { MenuLateral } from '../components/MenuLateral';
import { ContenidoPrincipal } from '../components/ContenidoPrincipal';
import { Inspector } from '../components/Inspector';
import { useFetch } from '../hooks/useFetch';
import { mostrarImagen, mostrarImagenSeleccionada, mostrarImagenVista } from '../config/urlConfig';
import { Configuracion } from '../components/Configuracion';
import { VisorWallpaper } from '../components/VisorWallpaper';

interface interfaceListaWallpapers {
  id_imagen: number;
  url: string;
}
interface interfaceWallpaper {
  id_imagen: string;
  url: string;
  semilla: string;
  imagen_listada: string;
  fecha_insercion: string;
  fecha_actualizacion: string;
  id_modelo_base: string;
  prompt_positivo_general: string;
  prompt_negativo_general: string;
  nombre_modelo_base: string;
}

interface configuracionAPI {
  //clave: string;
  directorioCheckpoints: string;
  directorioLoras: string;
  directorioOutput: string;
}

interface wallpaperGenerado {
  id_imagen: number;
  id_asset: number | null;
  nombre_archivo: string;
  ruta: string;
  fecha_creacion: string;
}

export const Home = () => {

  const [endpoint, setEndpoint] = React.useState<string | null>(null);
  const [metodo, setMetodo] = React.useState<string | null>(null);
  const [parametros, setParametros] = React.useState<string | null>(null);
  const [seleccion, setSeleccion] = React.useState<number | null>(null);
  const [limpiar, setLimpiar] = React.useState<boolean>(true);
  const [mostrarArchivosLocales, setMostrarArchivosLocales] = React.useState<boolean>(false);
  const [dataState, setDataState] = React.useState<interfaceListaWallpapers | wallpaperGenerado | null>(null);
  const [wallpaperDataState, setWallpaperDataState] = React.useState<interfaceWallpaper | null>(null);

  const [wallpaperSeleccionado, setWallpaperSeleccionado] = React.useState<string>('');

  const [configuracionJson, setConfiguracionJson] = useState<configuracionAPI | null>(null);
  const [configuracion, setConfiguracion] = React.useState<boolean>(false);
  const [visorWallpaper, setVisorWallpaper] = React.useState<boolean>(false);
  const [verFormulario, setVerFormulario] = React.useState<boolean>(false);

  const { data, fetchData, }
    = useFetch<interfaceListaWallpapers | wallpaperGenerado>({ endpoint: endpoint, metodo: metodo, params: parametros });
  const { data: wallpaperData, fetchData: consultarWallpaper, }
    = useFetch<interfaceWallpaper>({ endpoint: /* mostrarImagenVista */ mostrarImagenSeleccionada, metodo: 'GET', });

  useEffect(() => {
    if (!endpoint) return;
    fetchData();
  }, [endpoint])

  useEffect(() => {
    if (!seleccion) return;
    consultarWallpaper({ id_imagen: seleccion });
  }, [seleccion])

  useEffect(() => {
    console.log("HOME ", wallpaperSeleccionado);
  }, [wallpaperSeleccionado])

  useEffect(() => {
    if (!data) return;
    setDataState(data);
  }, [data])

  useEffect(() => {
    if (!wallpaperData) return;
    setWallpaperDataState(wallpaperData);
  }, [wallpaperData])

  /*   useEffect(() => {
      if (!limpiar) return;
      setDataState(null);
    }, [limpiar]) */

  useEffect(() => {
    const cargarConfiguracionJSON = async () => {
      //console.log("ENTRO A filesyste2");
      const archivos = await window.electronAPI.obtenerConfiguracion();
      setConfiguracionJson(archivos);
      //console.log("CONFIGURACION -> ", archivos);
    };
    cargarConfiguracionJSON();
  }, [])

  useEffect(() => {

    if (!wallpaperData) return;
    console.log("Wallpaper Seleccionado -> ", wallpaperData);

  }, [wallpaperData])

  /*   useEffect(()=>{
      console.log("Home json -> ",configuracionJson);
      window.electronAPI.guardarConfiguracion(configuracionJson);
    }, [configuracionJson])
  
   */
  return (
    <>
      <header>
        <Navegacion funcionConfiguracion={setConfiguracion} />
      </header>

      <main>
        <MenuLateral funcion1={setEndpoint} funcion2={setMetodo} funcion3={setParametros} funcionLimpiar={setLimpiar} formulario={setVerFormulario} json={configuracionJson} setLocales={setMostrarArchivosLocales} />
        <ContenidoPrincipal data={dataState} setData={setDataState} funcion={setSeleccion} limpieza={limpiar} setLimpieza={setLimpiar} formulario={verFormulario} json={configuracionJson} locales={mostrarArchivosLocales} />
        <Inspector wallpaper={wallpaperDataState} setWallpaperData={setWallpaperDataState} limpieza={limpiar} funcionVisor={setVisorWallpaper} funcionSeleccionar={setWallpaperSeleccionado} />

        {configuracion && (<Configuracion funcionConfiguracion={setConfiguracion} json={configuracionJson} setJson={setConfiguracionJson} />)}
        {visorWallpaper && (<VisorWallpaper funcionVisor={setVisorWallpaper} wallpaper={wallpaperSeleccionado} />)}
      </main>
    </>
  )
}
