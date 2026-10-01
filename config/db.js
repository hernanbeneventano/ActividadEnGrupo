import mongoose from "mongoose";

export const conectarDB = async () => {
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
        throw new Error("Falta definir MONGO_URI en el archivo .env");
    }

    await mongoose.connect(mongoUri);
    console.log("Conectado a MongoDB");
};
