import { Router } from "express";

import { registrarUsuario } from "../controllers/auth.controller.js";

export const basePath = "/auth";

const router = Router();

router.post("/", registrarUsuario);
router.post("/login", limitadorLogin, login);

export default router;