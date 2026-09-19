import express from "express";
import {
  mostrarImagenes,
  registrarImagen,
  mostrarImagenesGeneradas,
} from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", mostrarImagenes);

router.post("/registrar-asset", registrarImagen);

router.get("/mostrar-imagenes-generadas", mostrarImagenesGeneradas);

export default router;
