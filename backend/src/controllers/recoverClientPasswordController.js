import nodemailer from "nodemailer";
import crypto from "crypto";
import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import HTMLRecoverEmail from "../utils/sendMailRecoverClient.js";
import config from "../../config.js";
import clientModel from "../models/client.js";

const recoverClientPasswordController = {};

recoverClientPasswordController.sendRecoveryCode = async (req, res) => {
    try {
        const { email } = req.body;

        const clientFound = await clientModel.findOne({ email });
        if (!clientFound) {
            return res.status(404).json({ message: 'El correo no está registrado' });
        }

        const randomCode = crypto.randomBytes(3).toString("hex");

        const token = jsonwebtoken.sign(
            { randomCode, email },
            config.JWT.secret,
            { expiresIn: "15m" }
        );

        res.cookie("recoverPasswordCookie", token, { maxAge: 15 * 60 * 1000 });

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        });

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Recuperación de Contraseña - LØØM & WEFT",
            html: HTMLRecoverEmail(randomCode)
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: 'Error enviando el correo' });
            }
            return res.status(200).json({ message: 'Correo enviado exitosamente' });
        });

    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

recoverClientPasswordController.verifyCode = async (req, res) => {
    try {
        const { verificationCodeRequest } = req.body;
        const token = req.cookies.recoverPasswordCookie;

        if (!token) {
            return res.status(401).json({ message: 'El código ha expirado o no has solicitado uno' });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { randomCode } = decoded;

        if (verificationCodeRequest !== randomCode) {
            return res.status(400).json({ message: 'Código de verificación incorrecto' });
        }

        return res.status(200).json({ message: 'Código verificado correctamente' });
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

recoverClientPasswordController.resetPassword = async (req, res) => {
    try {
        const { newPassword } = req.body;
        const token = req.cookies.recoverPasswordCookie;

        if (!token) {
            return res.status(401).json({ message: 'Sesión expirada. Por favor solicita otro código' });
        }

        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const { email } = decoded;

        const passwordHashed = await bcryptjs.hash(newPassword, 10);

        await clientModel.findOneAndUpdate(
            { email },
            { password: passwordHashed }
        );

        res.clearCookie("recoverPasswordCookie");

        return res.status(200).json({ message: 'Contraseña actualizada correctamente' });
        
    } catch (error) {
        console.log("error", error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default recoverClientPasswordController;
