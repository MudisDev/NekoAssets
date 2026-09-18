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
  const imagen = {
    id_asset: null,
    nombre_archivo: req.body.nombre_archivo,
    ruta: req.body.ruta,
  };
  const generacion = {
    id_prompt: req.body.id_prompt,
    prompt_positivo: req.body.prompt_positivo,
    prompt_negativo: req.body.prompt_negativo,
    semilla: req.body.semilla,
    checkpoint: req.body.checkpoint,
    sampler: req.body.sampler,
    scheduler: req.body.scheduler,
    steps: req.body.steps,
    cfg: req.body.cfg,
    id_imagen_referencia: req.body.id_imagen_referencia,
    id_imagen_salida: req.body.id_imagen_salida,
  };
  try {
    await registrarEnTablaImagen(imagen);
    await registrarEnTablaGeneracion(generacion);

    res.json({
      success: true,
      data: "Se han registrado la imagen y la generacion con exito",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: "Error al registrar imagen y generación",
    });
  }
}
