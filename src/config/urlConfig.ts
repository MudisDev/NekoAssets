const server = "http://localhost";

const path = `${server}/waifupaper`;

const api = `${path}/api`;

const listPath = `${api}/lista`;
const imagetPath = `${api}/imagen`;

export const mostrarImagenes = `${listPath}/mostrar_imagenes.php`;
export const mostrarImagenesFavoritas = `${listPath}/mostrar_imagenes_favoritas.php`;

export const mostrarImagenVista = `${imagetPath}/buscar_imagen_vista.php`;