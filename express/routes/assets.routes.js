import express from "express";
import {
  mostrarImagenes,
  registrarImagen,
  mostrarImagenesGeneradas,
  mostrarImagenSeleccionada,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", mostrarImagenes);

router.post("/registrar-asset", registrarImagen);

router.get("/mostrar-imagenes-generadas", mostrarImagenesGeneradas);

//router.get("/mostrar-imagen-seleccionada/:id_imagen", mostrarImagenSeleccionada);
router.get("/mostrar-imagen-seleccionada", mostrarImagenSeleccionada);

export default router;
