import config from "../../config.js";

// Envía correos usando la API HTTP de Brevo (antes Sendinblue).
// Se usa API HTTP y no SMTP porque Render bloquea los puertos SMTP
// salientes (25, 465, 587) en el plan free, así que nodemailer + Gmail
// nunca lograba conectar. La API de Brevo funciona por HTTPS normal (443),
// así que no choca con esa restricción.
export async function sendBrevoEmail({ to, subject, html }) {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "api-key": config.brevo.api_key,
        },
        body: JSON.stringify({
            sender: { name: "LØØM & WEFT", email: config.brevo.sender_email },
            to: [{ email: to }],
            subject,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        console.log("Error de Brevo:", response.status, errorBody);
        throw new Error("No se pudo enviar el correo");
    }

    return response.json();
}

export default sendBrevoEmail;
