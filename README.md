# Lotlware Solutions Group

Sitio web oficial de Lotlware Solutions Group — landing page construida con React y Vite, con un chatbot de contacto integrado.

## Requisitos

- Node.js 18+

## Desarrollo

```bash
npm install
npm run dev        # frontend (Vite) en http://localhost:5173
npm run server      # backend de contacto (Express) en http://localhost:3001
```

Copia `.env.example` a `.env` y completa las credenciales de correo (contraseña de aplicación de Google) antes de levantar el servidor.

## Build de producción

```bash
npm run build       # genera dist/
npm run preview     # sirve el build localmente para verificar
```

## Estructura

- `src/components/Hero` — cabecera y presentación principal
- `src/components/aboutus` — sección "Sobre nosotros" / equipo
- `src/components/Skills` — habilidades técnicas
- `src/components/Projects` — portafolio de proyectos
- `src/components/Chatbot` — asistente virtual con formulario de contacto
- `server.js` — backend Express que envía el formulario de contacto por correo (Nodemailer)
