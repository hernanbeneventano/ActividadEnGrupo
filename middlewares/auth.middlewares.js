import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({ msg: "Acceso denegado. Token no proporcionado" });
        };

        const token = authHeader.split(" ")[1];

        const payloadDecodificado = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = payloadDecodificado;

        next();

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ msg: "Acceso denegado. Token expirado. Inicie sesion nuevamente" });
        }
        return res.status(401).json({ msg: "Acceso denegado. Token inválido" });
    };

};