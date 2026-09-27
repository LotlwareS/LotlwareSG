import 'dotenv/config';
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

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

const SYSTEM_INSTRUCTION = `Eres Lotli, el asistente virtual y asesor comercial de Lotlware Solutions Group. Tu personalidad es muy gentil, agradable, empática, tranquila y acogedora (tono lofi / cálido y relajado), manteniendo siempre un trato profesional, cercano, resolutivo y transparente. Usa emojis suaves y amables (😊, ✨, 🚀, 💻).

Tu objetivo principal es atender a los visitantes web, responder dudas de forma empática y convertirlos en clientes agendando una sesión de diagnóstico o asesoría gratuita de 15 a 20 minutos.

=== DIRECTRICES DE CONVERSACIÓN ===
1. Tono, Personalidad y Brevedad:
   - Profesional, cercano, resolutivo y transparente.
   - Mantén el tono de Lotli: siempre agradable, relajado y muy gentil.
   - Respuestas breves: máximo 2 a 3 oraciones por intervención. Evita saturar al usuario con bloques largos de texto.
   - Idioma: Por defecto, comunícate y responde SIEMPRE en español. Si en dado caso el usuario te saluda, escribe o pregunta en otro idioma (como inglés), adáptate con naturalidad y responde en ese mismo idioma.

2. Reglas de Localización y Modalidad:
   - Identifica con sutileza la ubicación del cliente si no la menciona.
   - Pachuca o Ixmiquilpan: Ofrece la opción de reunión presencial (en un punto a convenir o en sus oficinas) o virtual por videollamada, según lo que prefiera el cliente.
   - Fuera de Pachuca / Ixmiquilpan / Resto del país: Ofrece exclusivamente reunión virtual vía Google Meet o Zoom.

3. Datos Mínimos Requeridos (Slot Filling):
   Debes recopilar estos datos de manera natural a lo largo de la charla antes de cerrar el registro:
   - Necesidad / tipo de proyecto.
   - Nombre de contacto.
   - Teléfono / WhatsApp o Correo electrónico.
   - Ubicación (para definir modalidad).
   - Modalidad (Presencial o Virtual).
   - Día y horario preferido.

4. Cierre y Confirmación:
   - No envíes formularios externos ni enlaces largos a menos que el usuario lo pida explícitamente o pida enviar un correo directo.
   - Antes de dar por confirmada la cita, muestra un resumen claro de los datos y solicita la confirmación del usuario.

5. Canales de Contacto Directo / Redes:
   - Si el usuario pregunta por medios de contacto, redes o enlaces directos, compártele con calidez: WhatsApp (+52 772 100 5528) y correo (LotlwareSolutions@gmail.com).

=== EJEMPLO DE FLUJO IDEAL ===
Usuario: "Hola, me interesa una cotización para un sistema web."
Bot: "¡Hola! Con gusto te orientamos. Desarrollamos plataformas web a la medida. Para definir requerimientos y tiempos exactos, solemos tener una breve sesión de diagnóstico de 15 minutos sin costo. ¿Te encuentras en Pachuca, Ixmiquilpan o en otra ciudad?"`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
  systemInstruction: SYSTEM_INSTRUCTION,
  generationConfig: {
    maxOutputTokens: 180,
    temperature: 0.6,
  },
  tools: [
    {
      functionDeclarations: [
        {
          name: "show_contact_form",
          description: "Muestra el formulario de contacto o botones de WhatsApp cuando el usuario pide explícitamente un formulario o enlace externo.",
        }
      ]
    }
  ]
});

const CHATS_FILE = path.join(process.cwd(), "chats.json");
const saveChatLog = (sessionId, userMessage, botMessage) => {
  try {
    let logs = [];
    if (fs.existsSync(CHATS_FILE)) {
      const data = fs.readFileSync(CHATS_FILE, "utf-8");
      logs = JSON.parse(data);
    }
    logs.push({
      fecha: new Date().toISOString(),
      sessionId,
      userMessage,
      botMessage
    });
    fs.writeFileSync(CHATS_FILE, JSON.stringify(logs, null, 2));
  } catch (err) {
    console.error("Error guardando log:", err);
  }
};

// ─── Ruta principal: Chatbot IA ──────────────────────────────────────────────
app.post("/api/chat", async (req, res) => {
  const { sessionId, history, message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Mensaje vacío" });
  }

  try {
    let formattedHistory = (history || []).map(msg => ({
      role: msg.sender === "user" ? "user" : "model",
      parts: [{ text: msg.text || (msg.html ? "Mostré el formulario de contacto" : "Mostré opciones") }],
    }));

    // Gemini exige que el historial comience obligatoriamente con el rol 'user'
    while (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
      formattedHistory.shift();
    }

    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(message);
    const response = result.response;
    
    let responseText = "";
    try {
      responseText = response.text();
    } catch (_) {}

    const functionCalls = response.functionCalls();
    let showForm = false;
    if (functionCalls && functionCalls.some(call => call.name === "show_contact_form")) {
      showForm = true;
    } else if (responseText && (responseText.includes("show_contact_form") || responseText.toLowerCase().includes("formulario de contacto"))) {
      showForm = true;
      responseText = responseText
        .replace(/default_api:show_contact_form\(\)/g, "")
        .replace(/show_contact_form\(\)/g, "")
        .trim();
    }

    const botResponse = {
      text: responseText || "¿Cómo te gustaría contactarnos? 😊",
      showForm,
    };

    saveChatLog(sessionId || "anonymous", message, botResponse.text || "Formulario");

    res.json(botResponse);
  } catch (error) {
    console.error("Error en Gemini:", error);
    res.status(500).json({ error: "Error al procesar el mensaje con IA." });
  }
});

// ─── Registro de contactos ───────────────────────────────────────────────────
const CONTACTOS_FILE = path.join(process.cwd(), "contactos.json");
const saveContacto = (contacto) => {
  let contactos = [];
  if (fs.existsSync(CONTACTOS_FILE)) {
    contactos = JSON.parse(fs.readFileSync(CONTACTOS_FILE, "utf-8"));
  }
  contactos.push(contacto);
  fs.writeFileSync(CONTACTOS_FILE, JSON.stringify(contactos, null, 2));
};

// ─── Ruta principal: envío de correo ─────────────────────────────────────────
app.post("/api/enviar-correo", async (req, res) => {
  const { nombre, correo, asunto, mensaje } = req.body;

  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ éxito: false, mensaje: "Todos los campos son requeridos." });
  }

  const contacto = { fecha: new Date().toISOString(), nombre, correo, asunto: asunto || "", mensaje };

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
    contacto.correoEnviado = true;
  } catch (error) {
    console.error("Error al enviar correo:", error);
    contacto.correoEnviado = false;
  }

  try {
    saveContacto(contacto);
  } catch (error) {
    console.error("Error guardando contacto:", error);
  }

  // Se responde con éxito aunque falle el correo: el registro queda en contactos.json
  res.json({ éxito: true, mensaje: "Mensaje recibido correctamente." });
});

// ─── Healthcheck ──────────────────────────────────────────────────────────────
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => {
  console.log(`✅ Servidor Lotlware corriendo en http://localhost:${PORT}`);
});
