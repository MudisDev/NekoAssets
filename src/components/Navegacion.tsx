import React from 'react'

export const Navegacion = () => {
    return (
        <div id='navegacion'>
            <div className='logo'>
                <p>NekoAssets</p>
            </div>
            <div className='busqueda' >
                <input placeholder='Buscar Bv'></input>
            </div>
            <div className='configuracion'>
                <button>⚙️</button>
            </div>
        </div>
    )
}
