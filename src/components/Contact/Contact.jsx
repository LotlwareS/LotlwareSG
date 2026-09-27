import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ nombre: "", correo: "", asunto: "", mensaje: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/enviar-correo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.éxito) {
        setStatus("success");
        setForm({ nombre: "", correo: "", asunto: "", mensaje: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Contáctanos</h2>
        <p className="contact-subtitle">
          Cuéntanos sobre tu proyecto y te responderemos pronto.
        </p>

        <div className="contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form-row">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                value={form.correo}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="text"
              name="asunto"
              placeholder="Asunto"
              value={form.asunto}
              onChange={handleChange}
            />
            <textarea
              name="mensaje"
              placeholder="Cuéntanos sobre tu proyecto..."
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              required
            />
            <button type="submit" className="contact-submit" disabled={status === "sending"}>
              {status === "sending" ? "Enviando..." : "Enviar mensaje"}
            </button>

            {status === "success" && (
              <p className="contact-feedback success">
                ✅ ¡Mensaje enviado con éxito! Nuestro equipo se pondrá en contacto contigo pronto.
              </p>
            )}
            {status === "error" && (
              <p className="contact-feedback error">❌ No se pudo enviar el mensaje. Intenta de nuevo.</p>
            )}
          </form>

          <div className="contact-info">
            <h3>O contáctanos por otros medios</h3>
            <a href="mailto:LotlwareSolutions@gmail.com" className="contact-info-item">
              <i className="fas fa-envelope"></i>
              LotlwareSolutions@gmail.com
            </a>
            <a
              href="https://wa.me/5217721005528"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-item"
            >
              <i className="fab fa-whatsapp"></i>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
