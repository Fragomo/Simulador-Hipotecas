import express from "express";
import {
  simularPrestamo,
  obtenerSimulaciones,
} from "../controllers/simulacionController.js";
import { verificarToken } from "../controllers/usuarioController.js";

const router = express.Router();

router.post("/simular", verificarToken, simularPrestamo);
router.get("/simulaciones", verificarToken, obtenerSimulaciones);

export default router;
