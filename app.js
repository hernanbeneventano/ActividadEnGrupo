import "dotenv/config";
import authRoutes from "./routes/auth.routes.js";
import express from "express";
import { conectarDB } from "./config/db.js";
import productosRoutes from "./routes/productos.routes.js";
import proveedoresRoutes from "./routes/proveedores.routes.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(limitadorGlobal);

const origenesPermitidos = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://actividad-en-grupo.app",
]

app.use(cors((origin, callback) => {
    if (!origin || origenesPermitidos.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Error("No permitido por CORS"));
    }
}));

app.use(express.json());
app.use("/productos", productosRoutes);
app.use("/proveedores", proveedoresRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({ mensaje: "API de productos funcionando" });
});

try {
    await conectarDB();
    app.listen(port, () => {
        console.log(`Servidor escuchando en http://localhost:${port}`);
    });
} catch (error) {
    console.error("Error al conectar con MongoDB:", error.message);
    process.exit(1);
}
