import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.middleware.js";

import {
    crearProducto,
    obtenerProductos,
    actualizarPrecioStock,
    obtenerProductoPorId,
    borradoLogico,
} from "../controllers/producto.controller.js";

export const basePath = "/productos";

const router = Router();

router.post("/", [
    check("codigoSKU", "El código SKU es obligatorio")
        .trim()
        .notEmpty()
        .toUpperCase()
        .matches(/^[A-Z]{3}-[0-9]{3}$/)
        .withMessage("El código SKU debe tener 3 letras, un guion y 3 números"),
    check("nombre", "El nombre es obligatorio")
        .trim()
        .notEmpty(),
    check("precio", "El precio es obligatorio")
        .notEmpty()
        .isFloat({ min: 0 })
        .withMessage("El precio debe ser un número mayor o igual a 0"),
    check("stock", "El stock es obligatorio")
        .notEmpty()
        .isInt({ min: 0 })
        .withMessage("El stock debe ser un entero mayor o igual a 0"),
    check("categoria", "La categoría es obligatoria")
        .trim()
        .notEmpty()
        .toUpperCase()
        .isIn(["PERIFERICOS", "MONITORES", "COMPONENTES", "ACCESORIOS"])
        .withMessage("La categoría no es válida"),
    check("proveedor", "El proveedor debe ser un ID válido")
        .isMongoId(),
    check("estadoActivo", "estadoActivo debe ser booleano")
        .optional()
        .isBoolean(),
    validarCampos,
], crearProducto);

router.get("/", [
    check("categoria", "La categoría no es válida")
        .optional()
        .trim()
        .toUpperCase()
        .isIn(["PERIFERICOS", "MONITORES", "COMPONENTES", "ACCESORIOS"]),
    validarCampos,
], obtenerProductos);

router.get("/:id", [
    check("id", "El ID del producto no es válido")
        .isMongoId(),
    validarCampos,
], obtenerProductoPorId);

router.put("/:id", [
    check("id", "El ID del producto no es válido")
        .isMongoId(),
    check("precio", "El precio debe ser un número mayor o igual a 0")
        .optional()
        .isFloat({ min: 0 }),
    check("stock", "El stock debe ser un entero mayor o igual a 0")
        .optional()
        .isInt({ min: 0 }),
    check("codigoSKU", "El código SKU no es válido")
        .optional()
        .trim()
        .toUpperCase()
        .matches(/^[A-Z]{3}-[0-9]{3}$/),
    check("nombre", "El nombre no puede estar vacío")
        .optional()
        .trim()
        .notEmpty(),
    check("categoria", "La categoría no es válida")
        .optional()
        .trim()
        .toUpperCase()
        .isIn(["PERIFERICOS", "MONITORES", "COMPONENTES", "ACCESORIOS"]),
    check("proveedor", "El proveedor debe ser un ID válido")
        .optional()
        .isMongoId(),
    check("estadoActivo", "estadoActivo debe ser booleano")
        .optional()
        .isBoolean(),
    validarCampos,
], actualizarPrecioStock);

router.delete("/:id", [
    check("id", "El ID del producto no es válido")
        .isMongoId(),
    validarCampos,
], borradoLogico);

export default router;