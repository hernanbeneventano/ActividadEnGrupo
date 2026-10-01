export const verificarRolAdmin = (req, res, next) => {

if (!req.usuario.rol) {
    return res.status(500).json({ msg: "Error interno. Se intento verificar el rol del usuario, pero no se consiguio"})
};

if (req.usuario.rol !== "ADMIN") {
    return res.status(403).json({ msg: "Acceso denegado. No tiene permisos para realizar esta accion"});
};

next();
};