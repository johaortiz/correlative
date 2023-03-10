import { createTransport } from "nodemailer";
require("dotenv").config();

const { GOOGLE_EMAIL, GOOGLE_PASS, BASE_URL } = process.env;

let transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    tls: {
        rejectUnauthorized: false,
    },
    secure: true, // true for 465, false for other ports
    auth: {
        user: GOOGLE_EMAIL, // generated ethereal user
        pass: GOOGLE_PASS, // generated ethereal password
    }
});

export const sendEmail = async (email: string, hashedEmail: string) => {
    try {
        await transporter.sendMail({
            from: `UCP Correlativas`,
            to: email,
            subject: "Confirmá tu Cuenta",
            html: `<h3>Bienvenido a UCP Correlativas</h3>
                <p>¡Muchas gracias por registrarte!</p>
                <p>Por favor, confirme su correo electrónico para poder empezar a utilizar la plataforma</p>
                <a href="${BASE_URL}/users/validate?account=${hashedEmail}">¡Haz click aquí para confirmar!</a>
                <p>Recuerda que UCP Correlativas <strong>no</strong> es un sitio oficial ni autorizado por la Universidad Cuenca del Plata y que 
                este sitio está hecho por un estudiante para usarlo por él mismo y lo comparte con los demás alumnos</p>
                <p>¡Saludos!</p>
                `
        });
        return "All Ok";
    } catch (error) {
        throw Error(error);
    }
};