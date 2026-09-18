  import {
    obtenerImagenes,
    registrarEnTablaGeneracion,
    registrarEnTablaImagen,
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
