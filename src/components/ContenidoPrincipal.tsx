import React, { useEffect } from "react"


interface wallpaper {
    id_imagen: string,
    url: string
}


export const ContenidoPrincipal = ({ data, funcion, limpieza }) => {

    /*     const { data: listaWallpapers, fetchData: consultarWallpapers }
            = useFetch<wallpaper[]>({ endpoint: mostrarImagenes, metodo: 'GET' }) */

    //useEffect(() => { consultarWallpapers() }, [])


    return (
        <div id='contenido-principal'>
            {limpieza && (<div className='placeholder'><p>Bienvenido a <strong>NekoAssets</strong></p><p>Selecciona una opcion del menu lateral para comenzar.</p></div>)}
            {!limpieza && data?.length !== 0 && (
                <div className='contenedor-wallpapers'>
                    {data?.map(wallpaper => (
                        <button className='wallpaper' key={wallpaper.id_imagen} onClick={() => { funcion(wallpaper.id_imagen) }} >
                            <img src={wallpaper.url} />
                        </button>
                    ))}
                </div>
            )

            }
        </div>
    )
}
