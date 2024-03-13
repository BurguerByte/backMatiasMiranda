const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importar cors

const app = express();
const port = 3000; // Puedes cambiar el puerto si es necesario

// Middleware para parsear el cuerpo de la solicitud
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde el origen de tu aplicación React
app.use(cors());

// Configurar el transporte para nodemailer
const transporter = nodemailer.createTransport({
  host: 'smtp.uvchile.cl', // Aquí reemplaza 'tu_proveedor.com' con la dirección del servidor SMTP
  port: 587, // Puerto SMTP de la Universidad de Chile
  secure: true, // Se recomienda usar SSL/TLS para mayor seguridad
  auth: {
    user: 'matias@uvchile.cl', // Tu correo electrónico de la Universidad de Chile
    pass: 'Emilia6655@', // Contraseña de tu correo electrónico
  }
});

// Ruta para manejar el envío del formulario
app.post('/enviar-correo', (req, res) => {
  const { user_name, user_email,user_number , message } = req.body;

  // Configurar el contenido del correo electrónico
  const correoOptions = {
    from: 'Tu Nombre <tu_correo@cpanel.com>',
    to: 'correo_destino@example.com',
    subject: 'Nuevo mensaje de contacto',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Formulario de contacto</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          h2 {
            margin-top: 0;
          }
          p {
            margin: 10px 0;
          }
          .message {
            padding: 10px;
            background-color: #f9f9f9;
            border-left: 4px solid #4caf50;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Detalles del formulario de contacto:</h2>
          <div class="message">
            <p><strong>Nombre:</strong> ${user_name}</p>
            <p><strong>Correo:</strong> ${user_email}</p>
            <p><strong>Número:</strong> ${user_number}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  // Enviar correo electrónico
  transporter.sendMail(correoOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
      res.status(500).send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado con éxito:', info.response);
      res.status(200).send('Correo electrónico enviado con éxito');
    }
  });
});

// Iniciar el servidor
app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
