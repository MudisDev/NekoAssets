import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';

export const Configuracion = ({ funcionConfiguracion, json, setJson }) => {
    const navigate = useNavigate();

    const setconfig = () => {
        funcionConfiguracion(false);
    }

    const cerrarSesion = () => {
        navigate("/");
    }

    const guardarConfiguracion = async () => {
        await window.electronAPI.guardarConfiguracion(json);
    };

    const seleccionarDirectorioCheckpoints = async () => {
        const response = await window.electronAPI.seleccionarDirectorio();
        console.log("DIRECTORIO checkpoints -> ", response);
        setJson({ ...json, directorioCheckpoints: response });
    }

    const seleccionarDirectorioLoras = async () => {
        const response = await window.electronAPI.seleccionarDirectorio();
        console.log("DIRECTORIO loras -> ", response);
        setJson({ ...json, directorioLoras: response });
    }


    return (
        <div className='overlay'>
            <div id='configuracion'>
                <p>Configuracion</p>
                <button onClick={setconfig}>X</button>
                <button onClick={cerrarSesion}>Cerrar Sesion</button>

                {/* <input type='text' placeholder='Valor de clave' value={json.clave}
                    onChange={(e) => setJson({ ...json, clave: e.target.value })}>
                </input> */}
                <p><strong>Directorio Checkpoints</strong></p>
                <div className='contenedor-urls'>
                    <p>{json.directorioCheckpoints}</p>
                    <button onClick={seleccionarDirectorioCheckpoints}>SD</button>
                </div>
                <p><strong>Directorio Loras</strong></p>
                <div className='contenedor-urls'>
                    <p>{json.directorioLoras}</p>
                    <button onClick={seleccionarDirectorioLoras}>SD</button>
                </div>
                {/* <p><strong>Clave de configuracion - </strong>{json.clave}</p> */}

                <button onClick={guardarConfiguracion}>Guardar Configuracion</button>
            </div>
        </div>
    )
}
