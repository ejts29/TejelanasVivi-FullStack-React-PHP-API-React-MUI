# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Tejelanas Vivi - Landing Page Full Stack

Landing page desarrollada para Tejelanas Vivi, una empresa dedicada a la venta de lanas y artículos de tejido. Esta aplicación incluye frontend (React + Vite + Material UI) y backend (PHP + MySQL + API REST documentada con Swagger y Postman).

## Equipo de Desarrollo

- Efren Tovar Silva - RUT 25.698.445-8  
- Eduardo Ahumada Catalan - RUT 17.304.258-2  
- Repositorio GitHub: https://github.com/ejts29/tejelanas_vivi

## Estructura del Proyecto

tejelanas_vivi/
├── backend/
│   ├── api/
│   │   ├── productos/
│   │   ├── contacto/
│   │   ├── FAQ.php
│   │   └── QuienesSomos.php
│   ├── config/
│   ├── swagger.yaml
│   └── swagger-ui-master/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── ProductsCarousel.jsx
│   │   │   ├── FAQ.jsx
│   │   │   ├── QuienesSomos.jsx
│   │   │   └── Contacto.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
├── tejelanas.sql
├── tejelanas_vivi.postman_collection.json
└── README.md

## Tecnologías Utilizadas

- Frontend: React + Vite + Material UI
- Backend: PHP + MySQL
- API REST: Swagger (OpenAPI 3.0), Postman
- Control de versiones: Git + GitHub

## Instalación del Proyecto

### Requisitos
- Node.js y npm
- XAMPP o servidor Apache/PHP
- MySQL o MariaDB

### Frontend

cd tejelanas_vivi/frontend  
npm install  
npm run dev

### Backend

1. Copia la carpeta `tejelanas_vivi/backend` a `htdocs/` de XAMPP.
2. Importa el archivo `tejelanas.sql` en phpMyAdmin.
3. Ajusta las credenciales de la base de datos en `backend/config/db.php`.
4. Accede a la API desde: http://localhost/tejelanas_vivi/backend/api/

## Componentes Clave

### ServiceCard.jsx

Componente reutilizable que recibe props:

<ServiceCard 
  title="Lana Merino" 
  description="100% lana merino"
  image="/images/merino.jpg"
  onContactClick={handleContactClick}
/>

### ProductsCarousel.jsx

Carrusel de productos responsive.

### FAQ.jsx

Renderiza preguntas frecuentes desde la API (FAQ.php) con colapsables.

### Contacto.jsx

Formulario en desarrollo.

## Pruebas del Backend

- Colección de Postman: `tejelanas_vivi.postman_collection.json`
- Swagger UI: `backend/swagger-ui-master/index.html`
- Endpoints: Productos, FAQ, Contacto, Quienes Somos

## Control de Versiones con Git

- Rama principal: main
- Ramas de funcionalidad: feature/contact-form, feature/faq, etc.
- Pull Requests y fusiones hacia main

## Repositorio

https://ejts29.github.io/TejelanasVivi-FullStack-React-PHP-API-React-MUI/

## Retrospectiva

- Análisis del trabajo realizado
- Archivo: `Informe_Plan_Accion_Tejelanas.pdf`
- Próximas mejoras: validaciones, seguridad, performance

## Estado del Proyecto

- [x] Carrusel de productos
- [x] Componente reutilizable de tarjetas
- [x] FAQ y Quienes Somos dinámicos
- [x] API REST funcional
- [x] Especificación Swagger completa
- [x] Colección Postman
- [x] Guía de buenas prácticas
- [x] README.md documentado
- [x] Git y GitHub con ramas
- [x] Formulario de contacto completo con validaciones
