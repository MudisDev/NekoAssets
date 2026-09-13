import { obtenerImagenes } from "../models/asset.model.js";

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