import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const Configuracion = ({ funcionConfiguracion }) => {
    const navigate = useNavigate();

    const setconfig = () => {
        funcionConfiguracion(false);
    }

    const cerrarSesion = () => {
    navigate("/");
    }

    return (
        <div className='overlay'>
            <div id='configuracion'>
                <p>Configuracion</p>
                <button onClick={setconfig}>X</button>
                <button onClick={cerrarSesion}>Cerrar Sesion</button>
            </div>
        </div>
    )
}
