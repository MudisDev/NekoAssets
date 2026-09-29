import React, { useEffect } from 'react'

export const VisorWallpaper = ({ funcionVisor, wallpaper }) => {

    const cerrarVisor = () => {
        funcionVisor(false);
    }

    useEffect(()=> {
        if(!wallpaper) return;
        console.log("wallpaper ulr -> ", wallpaper );
    },[wallpaper])

    return (
        <div className='overlay'>
            <div id='visor-wallpaper'>
                <button onClick={cerrarVisor}>X</button>
                <img src={`nekoassets://local?path=${encodeURIComponent(wallpaper)}`} />
            </div>
        </div>
    )
}
