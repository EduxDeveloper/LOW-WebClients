import nodemailer from "nodemailer"; //envía correos electrónicos
import crypto from "crypto"; //genera tokens aleatorios
import jsonwebtoken from "jsonwebtoken"; //genera tokens JWT para autenticación
import bcryptjs from "bcryptjs"; //hashea contraseñas
import {v2 as cloudinary} from "cloudinary"; //configura Cloudinary para subir imágenes

import  config  from "../../config.js"; //importa configuración del proyecto, como la clave secreta para JWT

import employeeModel from '../models/employee.js';

//array de funciones
const registerEmployeeController = {};

registerEmployeeController.register = async (req, res) => {
    try {
         let {
            name,
            email,
            password,
            address,
            phone,
            salary,
        } = req.body;

            // Verificar si el correo electrónico ya está registrado
            const existingEmployee = await employeeModel.findOne({ email });
            if (existingEmployee) {
                return res.status(400).json({ message: "El correo electrónico ya está registrado" });
            }

            //encriptar contraseña
        const passwordHashed = await bcryptjs.hash(password, 10);

        //generar un codigo aleatorio
        const randomCode = crypto.randomBytes(3).toString("hex");

        //guardamos todo en un token
        const token = jsonwebtoken.sign(
            {
                randomCode,
                name,
                email,
                password: passwordHashed,
                address,
                phone,
                salary,
            },
            config.jwtSecret,
            { expiresIn: "15m" }
        );

        //guardamos el token en una cookie
        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        //enviar correo de confirmación
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.emailUser,
                pass: config.emailPassword,
            },
        });

        const mailOptions = {
            from: config.emailUser,
            to: email,
            subject: "Confirmación de registro",
            text: `Tu código de confirmación es: ${randomCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error al enviar el correo: " + error);
                return res.status(500).json({ message: "Error al enviar el correo de confirmación" });
            } else {
                console.log("Correo enviado: " + info.response);
                return res.status(200).json({ message: "Registro exitoso. Por favor, revisa tu correo para confirmar tu cuenta." });
            }

        });

        }catch (error) {
        console.error("error"+ error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

//vereficar el código de confirmación
registerEmployeeController.confirm = async (req, res) => {
    try {
        //1- solicitar el codigo de verificacion
        const { verificationCodeRequest} = req.body;

        //obtener el token de la cookie
        const token = req.cookies.registrationCookie;

        //extraer la informacion del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret);
        const {
            randomCode: storedCode,
            name,
            email,
            password,
            address,
            phone,
            salary,

        } = decoded

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({ message: "Invalid verification code" });
        }

        //3- guardar el empleado en la base de datos

        const newEmployee = new EmployeesModel({
            name,
            email,
            password,
            address,
            phone,
            salary,
            image: req.file,
            public_id: req.filename
        });

        await newEmployee.save();

        return res.status(200).json({ message: "Employee registered successfully" });

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default registerEmployeeController;
