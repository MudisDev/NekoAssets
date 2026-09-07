import React from 'react'
import "../css/normalize.css";
import "../css/styles.css";
import { Navegacion } from '../components/Navegacion';
import { MenuLateral } from '../components/MenuLateral';
import { ContenidoPrincipal } from '../components/ContenidoPrincipal';
import { Inspector } from '../components/Inspector';

export const Home = () => {
  return (
    <>
      <header>
        <Navegacion />
      </header>

      <main>
        <MenuLateral />
        <ContenidoPrincipal />
        <Inspector />
      </main>
    </>
  )
}
