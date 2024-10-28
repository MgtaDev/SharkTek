import type { APIRoute } from "astro";
import { Resend } from "resend";
// const apiKey = process.env.RESEND_API_KEY;

// Acceder a la variable de entorno
const apiKey = import.meta.env.RESEND_API_KEY;

const resend = new Resend(apiKey);
console.log(apiKey);

console.log(resend);


export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();

// Usa apiKey en tu lógica de frontend
console.log("API Key:", apiKey);
  const { subject, text, number, service, email, name } = body;
  console.log(subject, text );
  console.log(resend);
  
  

  if (!subject || !text) {
    return new Response(null, {
      status: 404,
      statusText: "Did not provide the right data",
    });
  }

  const send = await resend.emails.send({
    from:'SharkTek Contact Form <onboarding@resend.dev>',
    to:'passantinodev@gmail.com',
    subject: subject,
    html:  ` <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Correo Profesional</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f4f4f4;
          text-align: center;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #000000; /* Fondo negro */
          color: #ffffff;
          padding: 20px;
          text-align: center; /* Título centrado */
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
        }
        .logo {
          margin-top: 30px; /* Aumentado el margen superior */
          text-align: left; /* Alineación a la izquierda */
          padding-left: 20px; /* Espacio a la izquierda */
        }
        .content {
          padding: 0 20px;
          color: #333333;
          text-align: left; /* Texto alineado a la izquierda */
        }
        .content p {
          line-height: 1.6;
          margin: 10px 0;
        }
        .footer {
          background-color: #f4f4f4;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #777777;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Nuevo Mensaje del Formulario de Contacto</h1>
        </div>
        <div class="logo">
          <img src="https://shark-tek.vercel.app/SHARK.PNG" alt="Google Logo" width="200">
        </div>
        <div class="content">
          <p><strong>Nombre del Cliente:</strong> ${name}</p>
          <p><strong>Correo Electrónico:</strong> ${email}</p>
          <p><strong>Número de Teléfono:</strong> ${number}</p>
          <p><strong>Asunto:</strong> ${subject}</p>
          <p><strong>Tipo de Servicio:</strong> ${service}</p>
          <p><strong>Mensaje:</strong> ${text}</p>
        </div>
        <div class="footer">
          &copy; 2024 SharkTek. Todos los derechos reservados.
        </div>
      </div>
    </body>
    </html>`,
    text: text,
  });

  if (send.data) {
    return new Response(
      JSON.stringify({
        message: send.data,
      }),
      {
        status: 200,
        statusText: "OK",
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: send.error,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      }
    );
  }
};