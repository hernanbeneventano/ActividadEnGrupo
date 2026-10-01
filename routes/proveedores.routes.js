import { Router } from "express";

import {
    crearProveedor,
    obtenerProveedores,
    obtenerProveedorPorId,
    actualizarProveedor,
    borradoLogicoProveedor,
} from "../controllers/proveedor.controller.js";
import { verificarToken } from "../middlewares/auth.middlewares.js";

export const basePath = "/proveedores";

const router = Router();

router.post("/", verificarToken, crearProveedor);
router.get("/", verificarToken, obtenerProveedores);
router.get("/:id", verificarToken, obtenerProveedorPorId);
router.put("/:id", verificarToken, actualizarProveedor);
router.delete("/:id", verificarToken, borradoLogicoProveedor);

export default router;