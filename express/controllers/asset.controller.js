import {
  obtenerImagenes,
  registrarEnTablaGeneracion,
  registrarEnTablaImagen,
  mostrarImagenesGeneradasHistorial,
  vistaMostrarImagenSeleccionada,
} from "../models/asset.model.js";

export async function mostrarImagenes(req, res) {
  try {
    const imagenes = await obtenerImagenes();

    res.json({
      success: true,
      data: imagenes,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Error al obtener imágenes",
    });
  }
}

export async function registrarImagen(req, res) {
  const imagen = req.body.imagen;
  const generacion = req.body.generacion;

  try {
    const resultadoImagen = await registrarEnTablaImagen(imagen);

    generacion.id_imagen_salida = resultadoImagen.insertId;

    await registrarEnTablaGeneracion(generacion);

    res.json({
      success: true,
      data: "Se han registrado la imagen y la generación con éxito",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Error al registrar imagen y generación",
    });
  }
}

export async function mostrarImagenesGeneradas(req, res) {
  try {
    const imagenesGeneradas = await mostrarImagenesGeneradasHistorial();

    res.json(imagenesGeneradas);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Error al obtener imágenes",
    });
  }
}

export async function mostrarImagenSeleccionada(req, res) {
  //const id_imagen = req.params.id_imagen;
  const id_imagen = req.query.id_imagen;
  try {
    const imagenSeleccionada = await vistaMostrarImagenSeleccionada(id_imagen);

    res.json(imagenSeleccionada);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Error al obtener imágenes",
    });
  }
}
