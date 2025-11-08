
-----

# Tejelanas Vivi - Informe de Evaluación Final (Serverless Architecture)

Este documento es un informe consolidado que presenta el cumplimiento de los objetivos académicos de las asignaturas **Desarrollo Frontend / Backend (EVA3)** y documenta la arquitectura final de despliegue en la nube, la cual fue migrada para asegurar una operación **gratuita, estable y segura (HTTPS)**.

-----

## 1\. Evaluación Académica del Proyecto Original

El proyecto original cumplía con la rúbrica de la EVA3 mediante la implementación de una API REST en PHP y su consumo en React.

### 1.1 Cumplimiento de Criterios Técnicos y Backend

| Criterio de Evaluación | Cumplimiento |
| :--- | :--- |
| **Documentación CRUD** | Se documentaron exhaustivamente las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) para las entidades **Productos, FAQ, Contacto** y **Quiénes Somos**. |
| **Estructura OpenAPI 3.0** | Uso de la especificación **OpenAPI 3.0** para la documentación de la API (`swagger.yaml`). |
| **Respuestas HTTP Detalladas** | Definición explícita de códigos de respuesta (`200`, `400`, `404`, `500`) para manejar errores y garantizar la interoperabilidad. |
| **Validación de Datos PHP** | Se implementó validación en el lado del servidor antes del procesamiento de la base de datos (ej. verificación de campos requeridos). |
| **Implementación Funcional** | El backend inicial fue implementado en **PHP** con la extensión `mysqli` para la conexión a MySQL. |

### 1.2 Habilidades Frontend (React)

  * **Framework y Librerías:** Utilización de **React** y **Material UI (MUI)** para construir una interfaz modular, responsiva y de alto rendimiento.
  * **Componentización:** Creación de componentes reutilizables (`ProductCard`, `ContactForm`) que demuestran una estructura de proyecto escalable.
  * **Consumo de API:** Lógica asíncrona en React (`useEffect`) para consumir datos de la API (originalmente PHP).

-----

## 2\. Adaptación a Arquitectura Cloud y Serverless

Debido a la incompatibilidad del código PHP con el despliegue moderno y seguro (Netlify requiere HTTPS, el hosting gratuito de PHP es solo HTTP), el proyecto fue migrado a una arquitectura Serverless.

### 2.1 Resumen de la Arquitectura Final

| Componente | Tecnología Original | Tecnología Final (Cloud / Segura) | Impacto |
| :--- | :--- | :--- | :--- |
| **Backend / API** | PHP Scripts / MySQL | **Supabase (PostgreSQL / API HTTPS)** | Se eliminó la necesidad del servidor PHP y se resolvió el error de seguridad (`401 Unauthorized`). |
| **Conexión de Datos** | Duplicidad de credenciales | **Cliente Único Centralizado** | Se centralizó la instancia de Supabase en `supabaseClient.js`, resolviendo los errores de inicialización y las advertencias de código duplicado. |
| **Archivos Estáticos** | Rutas codificadas fallidas | **Importación de Módulos (Vite)** | Se corrigió la sintaxis de importación de imágenes en todos los componentes para eliminar los errores `404 Not Found` en producción. |

##  Tecnologías Finales Utilizadas

El proyecto fue migrado a una arquitectura Serverless (sin servidor PHP) para garantizar un despliegue en línea rápido y seguro.

| Componente | Tecnología | Notas |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, Material UI (MUI) | Interfaz de usuario moderna y modular. |
| **Backend / API** | Supabase (PostgreSQL) | Plataforma Serverless que proporciona la base de datos y la API RESTful. |
| **Despliegue** | Netlify | Alojamiento global para la aplicación React (sitio estático). |
| **Conexión** | `@supabase/supabase-js` | Conexión directa y segura (HTTPS) del cliente a la base de datos. |

---

# Ejecución y Despliegue (Versión Serverless)

Este proyecto está diseñado para funcionar como una **Aplicación Serverless** y se accede a él a través de la URL global de Netlify. El backend (API y Base de Datos) es proporcionado por Supabase.

---

## Ejecución en Línea (Versión Full Stack Serverless)

La aplicación ha sido configurada y desplegada para consumir datos de una API segura (HTTPS) sin necesidad de un servidor PHP.

* **Despliegue Final:** La aplicación React está publicada profesionalmente mediante el servicio gratuito Netlify.

* **Ver el Resultado Final:**
    Haga clic en el siguiente botón para acceder directamente al sitio web en línea (incluyendo las secciones dinámicas: Productos, FAQ, Quienes Somos):

    [![Ver Sitio Web](https://img.shields.io/badge/Ver%20Sitio%20Web-00A38D?style=for-the-badge&logo=netlify&logoColor=white)](https://tejelanasvivi-fullstack-react-php-api.netlify.app/)

---

## Ejecución Local (Versión Desarrollo React)

Para trabajar en el código y ver la aplicación conectada a la misma API de la nube (Supabase), siga estos pasos:

1.  **Requisitos:** Debe tener instalado Node.js y npm (o yarn).

2.  **Base de Datos (Conexión Remota):**
    * En este modelo Serverless, **no se requiere** instalar ni configurar un servidor de base de datos local (MySQL/XAMPP).
    * La aplicación React se conecta directamente al servicio **PostgreSQL de Supabase** en la nube a través de su **API REST HTTPS** (configurada en `src/services/supabaseClient.js`).

3.  **Instalar Dependencias:**
    * Abra la terminal en la carpeta raíz del proyecto y ejecute: `npm install`

4.  **Acceso Local:**
    * Inicie el servidor de desarrollo de Vite: `npm run dev`
    * Acceda a la aplicación en su navegador (normalmente en `http://localhost:5173`). Desde esta ubicación, el frontend se comunicará con la API de Supabase en la nube para obtener y enviar datos.

-----

## 3\. Estructura Final del Repositorio

```
.
├── src/                      # Código Fuente React
│   ├── assets/
│   │   └── images/           # Imágenes importadas con nombres sin espacios.
│   ├── components/           # Componentes React (Usa cliente centralizado)
│   └── services/
│       └── supabaseClient.js # INSTANCIA ÚNICA Y CENTRALIZADA DE SUPABASE
├── package.json              # Incluye @supabase/supabase-js
└── README.md                 # Este documento
```

-----

```eof
```
