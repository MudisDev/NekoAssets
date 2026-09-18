import { db } from "../config/database.js";

export async function obtenerImagenes() {
  const [rows] = await db.query("SELECT * FROM imagen");

  return rows;
}

export async function registrarEnTablaImagen(imagen) {
  const [resultado] = await db.execute(
    `INSERT INTO imagen
        (id_asset, nombre_archivo, ruta)
        VALUES (?, ?, ?)`,
    [imagen.id_asset, imagen.nombre_archivo, imagen.ruta],
  );

  return resultado;
}

export async function registrarEnTablaGeneracion(generacion) {
  const [resultado] = await db.execute(
    `INSERT INTO generacion (id_prompt, prompt_positivo, prompt_negativo, semilla, checkpoint, sampler, scheduler, steps, cfg, id_imagen_referencia, id_imagen_salida)
    VALUES(?,?,?,?,?,?,?,?,?,?,?)`,
    [
      generacion.id_prompt,
      generacion.prompt_positivo,
      generacion.prompt_negativo,
      generacion.semilla,
      generacion.checkpoint,
      generacion.sampler,
      generacion.scheduler,
      generacion.steps,
      generacion.cfg,
      generacion.id_imagen_referencia,
      generacion.id_imagen_salida,
    ],
  );
  return resultado;
}
