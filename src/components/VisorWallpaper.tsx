import React from 'react'

export const VisorWallpaper = ({ funcionVisor, wallpaper }) => {

    const cerrarVisor = () => {
        funcionVisor(false);
    }

    return (
        <div className='overlay'>
            <div id='visor-wallpaper'>
                <button onClick={cerrarVisor}>X</button>
                <img src={wallpaper} />
            </div>
        </div>
    )
}
