import { useNavigate, } from 'react-router-dom'

export const LogIn = () => {
    const navigate = useNavigate();

    const IniciarSesion = () => {
        navigate("/home");
    }

    return (
        <div><p style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>NekoAssets</p>

            <button onClick={IniciarSesion}>Iniciar Sesion</button>
        </div>

    )
}
