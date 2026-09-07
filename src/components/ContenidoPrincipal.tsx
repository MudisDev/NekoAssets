import { useEffect } from 'react';
import { useFetch } from '../hooks/useFetch'
import { mostrarImagenes } from '../config/urlConfig';

interface wallpaper {
    id_imagen: string,
    url: string
}


export const ContenidoPrincipal = () => {

    const { data: listaWallpapers, fetchData: consultarWallpapers }
        = useFetch<wallpaper[]>({ endpoint: mostrarImagenes, metodo: 'GET' })

    useEffect(() => { consultarWallpapers() }, [])

    return (
        <div id='contenido-principal'>
            <div>Pestaña contenido Bv</div>

            {listaWallpapers?.length !== 0 && (
                <div className='contenedor-wallpapers'>
                    {listaWallpapers?.map(wallpaper => (
                        <div className='wallpaper'>
                            <img src={wallpaper.url} key={wallpaper.id_imagen} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
