import React, { useEffect } from 'react'
import { useFetch } from '../hooks/useFetch'

/* interface ex {
    "Success": string;
} */

export const Inspector = ({ wallpaper, limpieza }) => {

    //const url = "http://localhost:3000";

    //const { data, fetchData, } = useFetch<ex>({ endpoint: url, metodo: 'GET' });

    /* useEffect(() => {
        fetchData();
    }, []) */

    console.log("WALLPAPERS -> ", wallpaper);

    return (
        <div id='inspector'>
            {/* <div>Inspector</div> */}
            {/* {data && (
                <><p>clave = {data.Success}</p></>
            )} */}

            {(limpieza || !wallpaper) && (<div className='placeholder'><p><strong>Inspector</strong></p><p>Ningun Asset seleccionado</p><p>Selecciona un asset para ver información y propiedades. </p></div>)}
            {!limpieza && wallpaper && (<>
                <img src={wallpaper.url} style={{ width: "5rem", aspectRatio: 9 / 16, objectFit: 'cover' }} />
                <p>id imagen: {wallpaper.id_imagen}</p>
                <p>semilla: {wallpaper.semilla}</p>
                <p>fecha insercion: {wallpaper.fecha_insercion}</p>
                <p>fecha actualizacion: {wallpaper.fecha_actualizacion}</p>
                <p>id modelo base: {wallpaper.id_modelo_base}</p>
                <p>nombre modelo base: {wallpaper.nombre_modelo_base}</p>
                <p>imagen listada: {wallpaper.imagen_listada}</p>

                <p>prompt + general: {wallpaper.prompt_positivo_general}</p>
                <p>prompt - general: {wallpaper.prompt_negativo_general}</p>


            </>)}
        </div>
    )
}