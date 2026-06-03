import express from "express";


import cors from "cors"

import cookieParser from "cookie-parser"

//creo una constante app que es una instancia de express, esto me permite usar todas las funcionalidades de express para crear mi servidor y manejar rutas, middlewares, etc.

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    //permitir el envio de cookies y credenciales
    credentials: true
}));

app.use(cookieParser());

//para que la api acepte json
app.use(express.json());

//rutas


export default app;