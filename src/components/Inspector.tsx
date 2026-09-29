import React, { useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'

/* interface ex {
    "Success": string;
} */

export const Inspector = ({ wallpaper, setWallpaperData, limpieza, funcionVisor, funcionSeleccionar }) => {

    //const url = "http://localhost:3000";

    //const { data, fetchData, } = useFetch<ex>({ endpoint: url, metodo: 'GET' });

    /* useEffect(() => {
        fetchData();
    }, []) */
    /*  if (wallpaper) {
         const url =
             `nekoassets://local?path=${encodeURIComponent(wallpaper.ruta)}`;
     } */

    useEffect(() => {
        if (!limpieza) return;
        setWallpaperData(null);
        funcionSeleccionar(null);
        //setLimpieza(false);
    }, [limpieza])

    const seleccionar = (url) => {
        console.log("funcion SELECCIONAR  ", url);
        funcionVisor(true);
        funcionSeleccionar(url);
    }

    return (
        <div id='inspector'>
            {/* <div>Inspector</div> */}
            {/* {data && (
                <><p>clave = {data.Success}</p></>
            )} */}

            {(limpieza || !wallpaper) && (<div className='placeholder'><p><strong>Inspector</strong></p><p>Ningun Asset seleccionado</p><p>Selecciona un asset para ver información y propiedades. </p></div>)}
            {!limpieza && wallpaper && (<>
                {/* <img src={wallpaper.url} style={{ width: "30rem", aspectRatio: 9 / 16, objectFit: 'cover', borderRadius: "1rem" }} /> */}
                <img src={`nekoassets://local?path=${encodeURIComponent(wallpaper.ruta)}`} style={{ width: "30rem", aspectRatio: 9 / 16, objectFit: 'cover', borderRadius: "1rem" }} />
                <p>id imagen: {wallpaper.id_imagen}</p>
                <p>id asset: {wallpaper.id_asset}</p>
                <p>nombre archivo: {wallpaper.nombre_archivo}</p>
                <p>fecha creacion imagen: {wallpaper.fecha_creacion_imagen}</p>
                <p>ruta: {wallpaper.ruta}</p>

                <p>id generacion: {wallpaper.id_generacion}</p>
                <p>id prompt: {wallpaper.id_prompt}</p>
                <p>prompt + general: {wallpaper.prompt_positivo}</p>
                <p>prompt - general: {wallpaper.prompt_negativo}</p>
                <p>checkpoint: {wallpaper.checkpoint}</p>
                <p>sampler: {wallpaper.sampler}</p>
                <p>scheduler: {wallpaper.scheduler}</p>
                <p>steps: {wallpaper.steps}</p>
                <p>cfg: {wallpaper.cfg}</p>
                <p>id imagen referencia: {wallpaper.id_imagen_referencia}</p>
                <p>id imagen salida: {wallpaper.id_imagen_salida}</p>
                <p>fecha creacion generacion: {wallpaper.fecha_creacion_generacion}</p>

                <button onClick={() => { seleccionar(wallpaper.ruta) }}>Ver Wallpaper</button>
            </>)}
        </div>
    )
}