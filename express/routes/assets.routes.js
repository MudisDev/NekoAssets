import express from "express";
import { mostrarImagenes, registrarImagen } from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", mostrarImagenes);

router.post("/registrar-asset", registrarImagen);

export default router;
