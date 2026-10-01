import { Proveedor } from "../models/Proveedor.js";

export const crearProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.create(req.body);
        res.status(201).json(proveedor);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el proveedor",
            error: error.message,
        });
    }
};

export const obtenerProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.find();
        res.status(200).json(proveedores);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error del servidor",
            error: error.message,
        });
    }
};

export const obtenerProveedorPorId = async (req, res) => {
    try {
        const proveedor = await Proveedor.findById(req.params.id);

        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).json({
            mensaje: "ID inválido",
            error: error.message,
        });
    }
};

export const actualizarProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        res.status(200).json(proveedor);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el proveedor",
            error: error.message,
        });
    }
};

export const borradoLogicoProveedor = async (req, res) => {
    try {
        const proveedor = await Proveedor.findByIdAndUpdate(
            req.params.id,
            { estadoActivo: false },
            { new: true, runValidators: true },
        );

        if (!proveedor) {
            return res.status(404).json({ mensaje: "Proveedor no encontrado" });
        }

        res.status(200).json({
            mensaje: "Proveedor desactivado correctamente",
            proveedor,
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al desactivar el proveedor",
            error: error.message,
        });
    }
};