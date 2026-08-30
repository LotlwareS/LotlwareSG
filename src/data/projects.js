export const projects = [
  {
    slug: "lotlwaresg-sitio-web",
    title: "LotlwareSG - Sitio Web",
    category: "Sitio Web",
    description:
      "Sitio web oficial de Lotlware Solutions Group construido con React y Vite. Incluye secciones de presentación, equipo, habilidades y chatbot inteligente.",
    tags: ["React", "Vite", "CSS3"],
    problema:
      "Como equipo necesitábamos un sitio propio que presentara quiénes somos, qué sabemos hacer y cómo contactarnos, sin depender solo de redes sociales.",
    solucion:
      "Construimos una landing page en React y Vite con secciones claras de presentación, equipo, servicios, tecnologías y proyectos, además de un formulario de contacto conectado a un backend propio.",
    funcionalidades: [
      "Diseño responsivo para móvil y escritorio",
      "Formulario de contacto con envío de correo",
      "Chatbot de asistencia integrado",
      "Presentación de equipo, servicios y proyectos",
    ],
    beneficios: [
      "Un solo lugar donde mostrar quiénes somos y qué hacemos",
      "Facilita que nuevos clientes nos contacten directamente",
      "Base reutilizable para futuras actualizaciones del equipo",
    ],
  },
  {
    slug: "chatbot-lotli",
    title: "Chatbot Lotli",
    category: "Módulo Web",
    description:
      "Asistente virtual bilingüe (ES/EN) integrado en el sitio, con historial persistente, modo oscuro y soporte para formulario de contacto.",
    tags: ["React", "JavaScript", "LocalStorage"],
    problema:
      "Los visitantes del sitio no siempre encuentran rápido la información que buscan, y preferimos ofrecer un canal directo de conversación antes que un simple menú estático.",
    solucion:
      "Desarrollamos un chatbot ligero en React que responde preguntas frecuentes en español e inglés, guarda el historial de la conversación y permite enviar un mensaje de contacto sin salir del chat.",
    funcionalidades: [
      "Respuestas en español e inglés",
      "Historial de conversación persistente (localStorage)",
      "Modo oscuro",
      "Formulario de contacto integrado en el chat",
      "Botones de respuesta rápida",
    ],
    beneficios: [
      "Reduce la fricción para contactarnos",
      "Da respuesta inmediata a las preguntas más comunes",
      "Disponible en cualquier sección del sitio",
    ],
  },
  {
    slug: "sistema-de-inventarios",
    title: "Sistema de Inventarios",
    category: "Aplicación Web",
    description:
      "Aplicación web para gestión de inventario con base de datos MySQL, panel de administración y reportes en PDF.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    problema:
      "Llevar el control de inventario en hojas de cálculo generaba errores de captura y dificultaba saber el stock real disponible en cualquier momento.",
    solucion:
      "Creamos una aplicación web en PHP con base de datos MySQL que centraliza productos, entradas y salidas, con un panel administrativo y generación de reportes en PDF.",
    funcionalidades: [
      "Registro de productos y categorías",
      "Control de entradas y salidas de inventario",
      "Panel administrativo",
      "Generación de reportes en PDF",
    ],
    beneficios: [
      "Centraliza la información de inventario en un solo sistema",
      "Reduce errores de captura manual",
      "Facilita generar reportes para auditorías",
    ],
  },
  {
    slug: "app-seguimiento-fitness",
    title: "App de Seguimiento Fitness",
    category: "Aplicación Móvil",
    description:
      "Aplicación móvil multiplataforma para rastrear rutinas de ejercicio y progreso personal con estadísticas en tiempo real.",
    tags: ["Flutter", "Firebase", "Dart"],
    problema:
      "Quienes entrenan por su cuenta suelen perder el registro de sus rutinas y no tienen una forma sencilla de ver su progreso a lo largo del tiempo.",
    solucion:
      "Desarrollamos una app en Flutter con Firebase como backend, para registrar rutinas, guardar el progreso del usuario y mostrar estadísticas de su actividad.",
    funcionalidades: [
      "Registro de rutinas de ejercicio",
      "Seguimiento de progreso personal",
      "Estadísticas de actividad",
      "Sincronización en la nube con Firebase",
    ],
    beneficios: [
      "Mantiene el historial de entrenamiento en un solo lugar",
      "Multiplataforma (Android e iOS) desde una sola base de código",
      "Datos respaldados en la nube",
    ],
  },
];

export const proceso = [
  {
    icon: "fas fa-magnifying-glass",
    title: "Análisis",
    description: "Levantamos los requisitos y objetivos del proyecto.",
  },
  {
    icon: "fas fa-pencil-ruler",
    title: "Diseño",
    description: "Planificamos la arquitectura y la experiencia de usuario.",
  },
  {
    icon: "fas fa-code",
    title: "Desarrollo",
    description: "Construimos la solución de forma iterativa.",
  },
  {
    icon: "fas fa-circle-check",
    title: "Pruebas",
    description: "Verificamos calidad y corregimos errores.",
  },
  {
    icon: "fas fa-rocket",
    title: "Despliegue",
    description: "Publicamos el proyecto y damos seguimiento.",
  },
];

const tagIcons = {
  React: "fab fa-react",
  Vite: "fas fa-bolt",
  CSS3: "fab fa-css3-alt",
  JavaScript: "fab fa-js",
  LocalStorage: "fas fa-database",
  PHP: "fab fa-php",
  MySQL: "fas fa-database",
  Bootstrap: "fab fa-bootstrap",
  Flutter: "fas fa-mobile-screen",
  Firebase: "fas fa-fire",
  Dart: "fas fa-diamond",
};

export const getTagIcon = (tag) => tagIcons[tag] || "fas fa-code";

export const getProjectBySlug = (slug) => projects.find((p) => p.slug === slug);

export const getRelatedProjects = (slug) => projects.filter((p) => p.slug !== slug);
