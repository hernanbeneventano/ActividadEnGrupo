import { Producto } from "../models/Productos.js";

export const crearProducto = async (req, res) => {
    try {
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al crear el producto",
            error: error.message,
        });
    }
};

export const obtenerProductos = async (req, res) => {
    try {
        const filtro = req.query.categoria
            ? { categoria: req. query.categoria.toUpperCase() }
            : {};
        const productos = await Producto.find(filtro);
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error del servidor",
            error: error.message,
        });
    }
};

export const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({
            mensaje: "ID invalido",
            error: error.message,
        });
    }
};

export const actualizarPrecioStock = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true },
        );

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el producto",
            error: error.message,
        });
    }
};

export const borradoLogico = async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            { estadoActivo: false },
            { new: true, runValidators: true },
        );
        
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.status(200).json({ 
            mensaje: "Producto desactivado correctamente",
            producto,
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al desactivar el producto",
            error: error.message,
        });
    }
};