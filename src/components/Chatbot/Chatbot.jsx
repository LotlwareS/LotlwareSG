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

const formatMessage = (text) => {
  if (!text) return "";
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [currentLang, setCurrentLang] = useState(() => localStorage.getItem("lotli-lang") || "es");
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem("lotli-theme") === "dark");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  const chatBoxRef = useRef(null);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", isDarkMode);
    localStorage.setItem("lotli-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const getWelcomeMessage = (lang = currentLang) => ({
    sender: "bot",
    text: lang === "es"
      ? "¡Hola! 👋 Soy **Lotli**, tu asesor en **Lotlware Solutions Group** ✨.<br/><br/>Estoy aquí para acompañarte, resolver dudas sobre tus proyectos de desarrollo web, apps o software a la medida, y ayudarte a agendar una **sesión de asesoría gratuita de 15 minutos**.<br/><br/>¿En qué proyecto te gustaría que trabajemos hoy? 😊☕"
      : "Hi! 👋 I'm **Lotli**, your advisor at **Lotlware Solutions Group** ✨.<br/><br/>I'm here to answer your questions about web development, apps, or custom software, and help you schedule a **free 15-minute diagnostic session**.<br/><br/>What project are you thinking of? 😊☕",
    options: lang === "es"
      ? ["Cotizar proyecto", "¿Qué servicios ofrecen?", "WhatsApp / Contacto directo"]
      : ["Get a quote", "What services do you offer?", "WhatsApp / Direct contact"]
  });

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("lotli-history") || "[]");
    if (history && history.length > 0) {
      setMessages(history);
    } else {
      setMessages([getWelcomeMessage(currentLang)]);
    }
  }, []);

  const handleResetChat = () => {
    localStorage.removeItem("lotli-history");
    setCurrentLang("es");
    localStorage.setItem("lotli-lang", "es");
    setMessages([getWelcomeMessage("es")]);
  };

  useEffect(() => {
    localStorage.setItem("lotli-history", JSON.stringify(messages));
    if (isOpen && chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const toggleChat = () => setIsOpen(prev => !prev);

  const handleSend = async (text = null) => {
    const input = document.getElementById("user-input");
    const userMessage = text || input.value.trim();
    if (!userMessage) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    input.value = "";

    // Respuesta instantánea para contacto directo y WhatsApp
    if (userMessage === "WhatsApp / Contacto directo" || userMessage === "WhatsApp / Direct contact" || userMessage.toLowerCase().includes("redes")) {
      const contactMsg = {
        sender: "bot",
        text: currentLang === "es" 
          ? "¡Con gusto! Aquí tienes nuestros canales de atención directa 😊. Puedes escribirnos por WhatsApp o enviarnos un correo:" 
          : "Sure! Here are our direct contact channels 😊:",
        html: `
          <div class="contact-buttons">
            <a href="https://wa.me/5217721005528" target="_blank" class="contact-btn">
              <i class="fab fa-whatsapp"></i> WhatsApp (+52 772 100 5528)
            </a>
            <a href="mailto:LotlwareSolutions@gmail.com" class="contact-btn">
              <i class="fas fa-envelope"></i> LotlwareSolutions@gmail.com
            </a>
          </div>
        `
      };
      setTimeout(() => {
        setMessages(prev => [...prev, contactMsg]);
      }, 300);
      return;
    }

    setIsTyping(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          history: messages,
          message: userMessage
        })
      });
      const data = await response.json();
      
      let botResponse = { text: data.text };
      
      // Si la IA usó Function Calling para mostrar el formulario
      if (data.showForm) {
        botResponse.html = `
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
          <div class="formulario-wrapper" style="margin-top: 15px;">
            <p class="formulario-texto">Por favor, llena el siguiente formulario y te responderemos pronto.</p>
            <form id="contact-form" class="lotli-form">
              <input type="text" name="nombre" placeholder="Tu nombre" required />
              <input type="email" name="correo" placeholder="Tu correo" required />
              <textarea name="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>
              <button type="submit" class="quick-option">Enviar</button>
            </form>
          </div>
        `;
      }

      setMessages(prev => [...prev, { sender: "bot", ...botResponse }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: "bot", text: "❌ Lo siento, estoy teniendo problemas de conexión con mis servidores." }]);
    } finally {
      setIsTyping(false);
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
              <button onClick={handleResetChat} title="Reiniciar chat">🔄</button>
              <button onClick={handleToggleLanguage} title="Cambiar idioma">🌐</button>
              <button onClick={toggleChat}><i className="fas fa-times"></i></button>
            </div>
          </div>

          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message-group ${msg.sender === "user" ? "user-group" : "bot-group"}`}>
                <div className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
                  {msg.sender === "bot" && <img src={lotliLogo} alt="Lotli" className="bot-logo" />}
                  
                  {(msg.text || msg.html) && (
                    <div className="bot-content">
                      {msg.text && <div dangerouslySetInnerHTML={{ __html: formatMessage(msg.text) }} />}
                      {msg.html && <div dangerouslySetInnerHTML={{ __html: msg.html }} />}
                    </div>
                  )}
                </div>

                {msg.options && (
                  <div className="quick-options">
                    {msg.options.map((opt, i) => (
                      <button key={i} className="quick-option" onClick={() => handleSend(opt)}>{opt}</button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message">
                <img src={lotliLogo} alt="Lotli" className="bot-logo" />
                <div className="bot-content">
                  <span className="typing-dots">
                    <span></span><span></span><span></span>
                  </span>
                </div>
              </div>
            )}
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
