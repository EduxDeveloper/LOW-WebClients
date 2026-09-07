import jsonwebtoken from "jsonwebtoken";
import config from "../../config.js";

// Verifica la cookie "authCookie" que pone loginClientController al iniciar sesión.
// Si es válida, guarda el id del cliente en req.clientId para usarlo en el controlador.
export function verifyClientToken(req, res, next) {
    try {
        const token = req.cookies.authCookie;

        if (!token) {
            return res.status(401).json({ message: "No hay sesión activa" });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);

        if (decoded.userType !== "client") {
            return res.status(403).json({ message: "No autorizado" });
        }

        req.clientId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Sesión inválida o expirada" });
    }
}

export default verifyClientToken;
