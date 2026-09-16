import React from 'react'
import { mostrarImagenes, mostrarImagenesFavoritas } from '../config/urlConfig'

export const MenuLateral = ({ funcion1, funcion2, funcion3, funcionLimpiar, formulario, setLocales }) => {

    const listarImagenes = () => {
        funcion1(mostrarImagenes);
        funcion2('GET');
        funcion3(null);
        funcionLimpiar(false);
        formulario(false);
        setLocales(false);
    }

    const limpiarSeleccion = () => {
        funcion1(null);
        funcion2(null);
        funcion3(null);
        funcionLimpiar(true);
        formulario(false);
        setLocales(false);
    }

    const listarFavoritas = () => {
        funcion1(mostrarImagenesFavoritas);
        funcion2('GET');
        funcion3({ id_usuario: 1 })
        funcionLimpiar(false);
        formulario(false);
        setLocales(false);
    }

    const formularioGenerar = () => {
        funcionLimpiar(false);
        formulario(true);
        setLocales(false)
    }

    const listarHistorial = () => {
        funcionLimpiar(false);
        formulario(false);
        setLocales(true);
    }

    return (
        <div id='menu-lateral'>
            {/*  <div>Menu Lateral</div> */}
            <button onClick={limpiarSeleccion}>Limpiar Selección</button>
            <p>Assets</p>
            <button onClick={listarImagenes}>Todos</button>
            <button>Recientes</button>
            <button onClick={listarFavoritas}>Favoritos</button>
            <p>Generacion</p>
            <button onClick={formularioGenerar}>Generaciones</button>
            <button onClick={listarHistorial}>Historial</button>
            <p>Organizacion</p>
            <button>Colecciones</button>
        </div>
    )
}
