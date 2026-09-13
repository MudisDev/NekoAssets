import { db } from "../config/database.js";

export async function obtenerImagenes() {
  const [rows] = await db.query("SELECT * FROM imagen");

  return rows;
}