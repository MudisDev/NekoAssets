import { useEffect } from 'react';
import { useNavigate, } from 'react-router-dom'

export const LogIn = () => {
    const navigate = useNavigate();

    const IniciarSesion = () => {
        navigate("/home");
    }

    useEffect(() => {
        const fileSystem = async () => {
            console.log("ENTRO A filesyste");
            const archivos = await window.electronAPI.obtenerArchivos();
            console.log("ARCHIVOS -> ", archivos);
        };
        fileSystem();
    }, [])
    




    return (
        <div id='login'>
            <div className='contenedor-login'>
                <p>NekoAssets</p>
                <input placeholder='Usuario'></input>
                <input placeholder='Contraseña'></input>
                <button onClick={IniciarSesion}>Iniciar Sesion</button>
            </div>
        </div>

    )
}
