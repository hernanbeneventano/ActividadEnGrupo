import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UsuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"],
    },
    rol: {
        type: String,
        enum: ["ADMIN", "VENDEDOR"],
        default: "VENDEDOR",
    },
},{
    timestamps: true,
});

UsuarioSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();

    try {
        const salt = await bcrypt.genSalt(10);

        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

UsuarioSchema.methods.comparePassword = async function(passwordIngresado) {
    return await bcrypt.compare(passwordIngresado, this.password);
};

export const Usuario = mongoose.model("Usuario", UsuarioSchema);