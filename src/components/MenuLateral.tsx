import React from 'react'
import { mostrarImagenes, mostrarImagenesFavoritas } from '../config/urlConfig'

export const MenuLateral = ({ funcion1, funcion2, funcion3, funcionLimpiar, formulario }) => {

    const listarImagenes = () => {
        console.log("Se van a listar todas Bv");
        funcion1(mostrarImagenes);
        funcion2('GET');
        funcion3(null);
        funcionLimpiar(false);
        formulario(false);
    }

    const limpiarSeleccion = () => {
        console.log("Se van a limpiar Bv");
        funcion1(null);
        funcion2(null);
        funcion3(null);
        funcionLimpiar(true);
        formulario(false);
    }

    const listarFavoritas = () => {
        console.log("listar favoritos Bv");
        funcion1(mostrarImagenesFavoritas);
        funcion2('GET');
        funcion3({ id_usuario: 1 })
        funcionLimpiar(false);
        formulario(false);
    }

    const formularioGenerar = () => {
        funcionLimpiar(false);
        formulario(true);
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
            <button>Historial</button>
            <p>Organizacion</p>
            <button>Colecciones</button>
        </div>
    )
}
