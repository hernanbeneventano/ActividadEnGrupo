import { Usuario } from "../models/Usuario.js";
import jsonwebtoken from "jsonwebtoken";

export const registrarUsuario = async (req, res) => {
    const { email } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }
        usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json({ msg: "Usuario registrado correctamente" });
    } catch (error) {
        res.status(400).json({ msg: "Error al registrar el usuario", error: error.message });
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: "El usuario no existe" });
        }
        if (!usuario) {
            return res.status(401).json({ msg: "Credenciales invalidas"});
        }
        const passwordCorrecto = await usuario.comparePassword(password);
        if (!passwordCorrecto) {
            return res.status(401).json({ msg: "Credenciales invalidas" });
        }
        const payload = {
            id: usuario._id,
            rol: usuario.rol,
        }
        const token = jsonwebtoken.sign(
            payload, 
            process.env.SECRETA, 
            {expiresIn: process.env.JWT_EXPIRATION}
        ); 
        res.status(200).json({ 
            msg: "Login exitoso",
            token: token,
        });
    } catch (error) {
        res.status(400).json({ msg: "Error al iniciar sesión", error: error.message });
        console.log(error);
    }
};