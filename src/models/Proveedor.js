import mongoose from "mongoose";

const ContactoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email de contacto es requerido"],
        lowercase: true,
    },
    telefono: {
        type: String,
    },
}, { _id: false });

const DireccionSchema = new mongoose.Schema({
    calle: {
        type: String,
        required: [true, "La calle es requerida"],
    },
    ciudad: {
        type: String,
        required: [true, "La ciudad es requerida"],
    },
    pais: {
        type: String,
        default: "Argentina",
    },
}, { _id: false });

const ProveedorSchema = new mongoose.Schema({
    razonSocial: {
        type: String,
        required: [true, "La razón social es requerida"],
        trim: true,
        uppercase: true,
    },
    cuit: {
        type: String,
        required: [true, "El CUIT es requerido"],
        unique: true,
        match: [/^[0-9]{11}$/, "El CUIT debe tener exactamente 11 números sin guiones"],
    },
    contacto: {
        type: ContactoSchema,
        required: [true, "El contacto es requerido"],
    },
    direccion: {
        type: DireccionSchema,
        required: [true, "La dirección es requerida"],
    },
    calificacion: {
        type: Number,
        required: [true, "La calificación es requerida"],
        min: [1, "La calificación mínima es 1"],
        max: [5, "La calificación máxima es 5"],
        default: 3,
    },
    estadoActivo: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

export const Proveedor = mongoose.model("Proveedor", ProveedorSchema);