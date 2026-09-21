// Usamos el fetch nativo de Node 18+, NO node-fetch (nunca estuvo en
// package.json y tumbaba el backend al arrancar).
import { config } from "../../config.js";

const wompiController = {};

wompiController.generarToken = async (req, res) => {
  try {
    const response = await fetch("https://id.wompi.sv/connect/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: config.wompi.grant_type,
        audience: config.wompi.audience,
        client_id: config.wompi.client_id,
        client_secret: config.wompi.client_secret,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /Tokenizacion -> { numeroTarjeta, cvv, mesVencimiento, anioVencimiento, nombreEnTarjeta? }
// Devuelve { token, tarjetaEnmascarada }
wompiController.tokenizarTarjeta = async (req, res) => {
  try {
    const { token, numeroTarjeta, cvv, mesVencimiento, anioVencimiento, nombreEnTarjeta } = req.body;

    const body = { numeroTarjeta, cvv, mesVencimiento, anioVencimiento };
    if (nombreEnTarjeta) body.nombreEnTarjeta = nombreEnTarjeta;

    console.log("Enviando a /Tokenizacion:", body); // 👈 agrega esto
    console.log("Token usado (primeros 20 chars):", token?.slice(0, 20)); // 👈 y esto

    const response = await fetch("https://api.wompi.sv/Tokenizacion", {
      
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// POST /TransaccionCompra/TokenizadaSin3Ds -> { monto, emailCliente, nombreCliente, tokenTarjeta }
// Devuelve { idTransaccion, esReal, esAprobada, codigoAutorizacion, mensaje, monto }
wompiController.paymentTest = async (req, res) => {
  try {
    const { token, formData } = req.body;

    const response = await fetch(
      "https://api.wompi.sv/TransaccionCompra/TokenizadaSin3Ds",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

wompiController.payment3DS = async (req, res) => {
  try {
    const { token, formData } = req.body;

    const response = await fetch("https://api.wompi.sv/TransaccionCompra/3Ds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default wompiController;