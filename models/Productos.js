import mongoose from "mongoose";

const ProductoSchema = new mongoose.Schema({
    codigoSKU: {
        type: String,
        required: [true, "El código SKU es requerido"],
        unique: true,
        uppercase: true,
        match: [/^[A-Z]{3}-[0-9]{3}$/, "El código SKU debe tener 3 letras en mayusculas, un guion y 3 numeros"],
    },
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"],
        trim: true,
    },
    precio: {
        type: Number,
        required: [true, "El precio es requerido"],
        min: [0, "El precio no puede ser negativo"],
    },
    stock: {
        type: Number,
        required: [true, "El stock es requerido"],
        min: [0, "El stock no puede ser negativo"],
        default: 0,
    },
    categoria: {
        type: String,
        required: [true, "La categoria es requerida"],
        enum: ["PERIFERICOS", "MONITORES", "COMPONENTES", "ACCESORIOS"],
        uppercase: true,
    },
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proveedor",
        required: [true, "El producto debe pertenecer a un proveedor"],
    },
    estadoActivo: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

export const Producto = mongoose.model("Producto", ProductoSchema);