import React, { useState, useEffect, useRef } from "react";
import "./Chatbot.css";
import lotliLogo from "../../assets/incono.png";
import botLogo from "../../assets/logonegro.png";

const translations = {
  es: {
    greeting: "¡Hola! Soy Lotli, tu asistente virtual.😊 ¿Sobre qué te gustaría saber más?",
    services: "Servicios",
    contact: "Contacto",
    portfolio: "Portafolio",
    unknown: "Lo siento, aún estoy aprendiendo. Puedes preguntarme sobre nuestros servicios, contacto o ubicación."
  },
  en: {
    greeting: "Hi! I'm Lotli, your virtual assistant.😊 What would you like to know about?",
    services: "Services",
    contact: "Contact",
    portfolio: "Portfolio",
    unknown: "Sorry, I'm still learning. You can ask about our services, contact or location."
  }
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("lotli-lang") || "es");
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("lotli-theme") === "dark");
  const chatBoxRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("lotli-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("lotli-history") || "[]");
    setMessages(history);
  }, []);

  useEffect(() => {
    localStorage.setItem("lotli-history", JSON.stringify(messages));
    if (isOpen && chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(prev => !prev);

  const handleSend = (text = null) => {
    const input = document.getElementById("user-input");
    const userMessage = text || input.value.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    input.value = "";

    const response = getBotResponse(userMessage.toLowerCase());

    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", ...response }]);
    }, 500);
  };

  const getBotResponse = (msg) => {
    const t = translations[currentLang];

    if (msg.includes("hola") || msg.includes("hello") || msg.includes("lotli")) {
      return {
        text: t.greeting,
        options: [t.services, t.contact, t.portfolio]
      };
    } else if (msg.includes("servicio") || msg.includes("services")) {
      return {
        text: currentLang === "es"
          ? "Ofrecemos desarrollo de software a la medida, sitios web, apps móviles y soluciones empresariales."
          : "We offer custom software development, websites, mobile apps, and business solutions.",
        options: currentLang === "es" ? ["Tecnologías", "¿Tienen precios?"] : ["Technologies", "Do you have prices?"]
      };
    } else if (msg.includes("contacto") || msg.includes("contact")) {
      return {
        text: currentLang === "es"
          ? "¿Cómo te gustaría contactarnos? 😊"
          : "How would you like to contact us? 😊",
        html: `
          <div class="contact-buttons">
            <a href="https://wa.me/5217721005528" target="_blank" class="contact-btn">
              <i class="fab fa-whatsapp"></i> WhatsApp
            </a>
            <a href="https://t.me/share/url?url=https://lotlware.com" target="_blank" class="contact-btn">
              <i class="fab fa-telegram"></i> Telegram
            </a>
            <a href="mailto:LotlwareSolutions@gmail.com" class="contact-btn">
              <i class="fas fa-envelope"></i> Correo
            </a>
          </div>
        `
      };
    } else if (msg.includes("formulario") || msg.includes("cotización") || msg.includes("mensaje")) {
      return {
        text: "",
        html: `
          <div class="formulario-wrapper">
            <p class="formulario-texto">Por favor, llena el siguiente formulario y te responderemos pronto.</p>
            <form id="contact-form" class="lotli-form">
              <input type="text" name="nombre" placeholder="Tu nombre" required />
              <input type="email" name="correo" placeholder="Tu correo" required />
              <textarea name="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>
              <button type="submit" class="quick-option">Enviar</button>
            </form>
          </div>
        `
      };
    } else {
      return {
        text: t.unknown,
        options: [t.services, t.contact, "Ubicación"]
      };
    }
  };

  const handleToggleTheme = () => setIsDarkMode(prev => !prev);

  const handleToggleLanguage = () => {
    const newLang = currentLang === "es" ? "en" : "es";
    setCurrentLang(newLang);
    localStorage.setItem("lotli-lang", newLang);
    handleSend("hola");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/enviar-correo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: formData.get("nombre"),
          correo: formData.get("correo"),
          mensaje: formData.get("mensaje"),
        }),
      });

      const data = await response.json();

      if (data.éxito) {
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: "✅ ¡Mensaje enviado correctamente! Pronto nos pondremos en contacto contigo.",
          }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: "bot",
            text: "❌ No se pudo enviar el mensaje: " + data.mensaje,
          }
        ]);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Error de red: " + error.message,
        }
      ]);
    }

    form.remove();
  };

  // Attaches submit handler to the injected contact form (rendered via dangerouslySetInnerHTML)
  useEffect(() => {
    const form = document.getElementById("contact-form");
    if (form) {
      form.addEventListener("submit", handleFormSubmit);
      return () => form.removeEventListener("submit", handleFormSubmit);
    }
  }, [messages]);

  return (
    <>
      <div className="chat-toggle" onClick={toggleChat}>
        <img src={lotliLogo} alt="Lotli Logo" className="lotli-icon" />
      </div>

      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="left">
              <img src={lotliLogo} alt="Lotli" />
              <span>Asistente Lotli</span>
            </div>
            <div className="chat-controls">
              <button onClick={handleToggleLanguage} title="Cambiar idioma">🌐</button>
              <button onClick={toggleChat}><i className="fas fa-times"></i></button>
            </div>
          </div>

          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                {msg.sender === "bot" && <img src={lotliLogo} alt="Lotli" className="bot-logo" />}
                
                {(msg.text || msg.html) && (
                  <div className="bot-content">
                    {msg.text && <span dangerouslySetInnerHTML={{ __html: msg.text }} />}
                    {msg.html && <div dangerouslySetInnerHTML={{ __html: msg.html }} />}
                  </div>
                )}

                {msg.options && (
                  <div className="quick-options">
                    {msg.options.map((opt, i) => (
                      <button key={i} className="quick-option" onClick={() => handleSend(opt)}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="input-container">
            <input
              type="text"
              id="user-input"
              placeholder="Escribe tu mensaje..."
              maxLength={100}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={() => handleSend()}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
