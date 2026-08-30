import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middlewares ──────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// ─── Nodemailer transporter ───────────────────────────────────────────────────
// Configura tus credenciales reales aquí o usa variables de entorno (.env)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER || "LotlwareSolutions@gmail.com",
    pass: process.env.MAIL_PASS || "TU_CONTRASENA_DE_APP",   // usa contraseña de aplicación de Google
  },
});

// ─── Ruta principal: envío de correo ─────────────────────────────────────────
app.post("/api/enviar-correo", async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ éxito: false, mensaje: "Todos los campos son requeridos." });
  }

  const mailOptions = {
    from: `"${nombre}" <${process.env.MAIL_USER || "LotlwareSolutions@gmail.com"}>`,
    to: "LotlwareSolutions@gmail.com",
    replyTo: correo,
    subject: asunto ? `${asunto} — ${nombre}` : `Nuevo mensaje de contacto de ${nombre}`,
    html: `
      <h2>Nuevo mensaje desde el sitio web de Lotlware Solutions</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Correo:</strong> ${correo}</p>
      ${asunto ? `<p><strong>Asunto:</strong> ${asunto}</p>` : ""}
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ éxito: true, mensaje: "Correo enviado correctamente." });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ éxito: false, mensaje: "Error interno al enviar el correo." });
  }
});

// ─── Healthcheck ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`✅ Servidor Lotlware corriendo en http://localhost:${PORT}`);
});
