import React from 'react'

export const Navegacion = ({ funcionConfiguracion }) => {

    const setconfig = () => {
        funcionConfiguracion(true);
    }
    return (
        <div id='navegacion'>
            <div className='logo'>
                <p>NekoAssets</p>
            </div>
            <div className='busqueda' >
                <input placeholder='Buscar'></input>
            </div>
            <div className='configuracion'>
                <button onClick={setconfig}>⚙️</button>
            </div>
        </div>
    )
}
