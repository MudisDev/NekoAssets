import express from "express";
import { mostrarImagenes } from "../controllers/asset.controller.js";

const router = express.Router();

router.get("/", mostrarImagenes);

export default router;
