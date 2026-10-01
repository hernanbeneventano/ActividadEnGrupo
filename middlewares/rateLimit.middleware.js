import rateLimit from 'express-rate-limit';

const limitadorGlobal = rateLimit({
    windowsMs: 15 * 60 * 1000, // 15 minutos
    max: 100,
    message: {
        mensaje: "Has superado el limite de solicitudes. Por favor, inténtalo de nuevo más tarde."
    }
});

export const limitadorLogin = rateLimit({
    windowMs: 60 * 60 * 1000, // 15 minutos
    max: 5, // Limite de solicitudes por IP
    message: {
        mensaje: "Has superado el limite de solicitudes. Por favor, inténtalo de nuevo aun más tarde."
    }
})
