# GamezVazStore API Backend 🎮

Este es el repositorio del **Backend** de `ecommerce-api-videogames`. Es una API RESTful desarrollada con Node.js y Express que gestiona toda la lógica de negocio, autenticación, base de datos (MongoDB) y recursos de nuestra tienda de videojuegos (GamezVazStore).

> [!TIP]
> Este archivo sirve como una guía de **Inicio Rápido (Quick Start)**. Para ver los detalles arquitectónicos, configuraciones profundas y reportes, por favor dirígete a la carpeta oficial de `/documentation`.

---

## 🚀 Inicio Rápido (Quick Start)

Sigue estos pasos para levantar el entorno de desarrollo local en tu máquina.

### 1. Requisitos Previos
*   **Node.js** (v16 o superior)
*   **MongoDB** (Local o cuenta en MongoDB Atlas)
*   **Postman** (Recomendado para probar las rutas)

### 2. Instalación
Clona el repositorio e instala las dependencias del proyecto usando NPM:
```bash
npm install
```

### 3. Variables de Entorno
El proyecto necesita de variables de entorno para funcionar. Existe un archivo de ejemplo llamado `.env.example`.
*   Crea un archivo llamado `.env` en la raíz del proyecto.
*   Copia el contenido de `.env.example` en tu nuevo `.env` y sustituye los valores con tus credenciales reales (Puerto, URI de MongoDB, Secretos de JWT, etc.).

### 4. Ejecutar el Servidor
Para arrancar el servidor en entorno de desarrollo, utiliza el siguiente comando:
```bash
npm run dev
# O también puedes usar: npm start
```
Si todo está correctamente configurado, verás un mensaje indicando que el servidor está corriendo en el puerto especificado (por defecto `5000`) y conectado exitosamente a la base de datos.

---

## 📚 Documentación Oficial

Para mantener la raíz del proyecto limpia, toda la documentación técnica, guías de uso y reportes residen dentro de la carpeta `/documentation`. 

A continuación, los enlaces directos a los documentos más importantes:

### 📐 Arquitectura y Proyecto
*   **[Documentación del Proyecto](./documentation/project-documentation.md):** Contiene la visión técnica detallada, modelos de bases de datos, tecnologías utilizadas y estructura interna.
*   **[Resumen de Sesiones](./documentation/SESSION-SUMMARY.md):** Bitácora de progresos, refactorizaciones y toma de decisiones.

### 🔌 Guías de API (Postman)
Para interactuar con el servidor de manera efectiva, hemos preparado guías modulares y una colección exportada para tu entorno:
*   **[Guía General de Postman](./documentation/postman-guide.md):** Cómo importar y utilizar el entorno.
*   **[Guía de Autenticación (Auth)](./documentation/postman-auth-guide.md)**
*   **[Guía de Productos](./documentation/postman-products-guide.md)**
*   **[Guía del Carrito (Cart)](./documentation/postman-cart-guide.md)**
*   **[Guía de Órdenes](./documentation/postman-orders-guide.md)**
*   **[Guía de Direcciones (Shipping)](./documentation/postman-shippingAddress-guide.md)**
*   **[Colección JSON Exportada](./documentation/ecommerce-db.postman_collection.json)** (Lista para importar a Postman).

### 🧪 Pruebas
*   **[Reporte de Pruebas (Test Report)](./documentation/TEST-REPORT.md):** Resumen sobre validaciones de calidad de código y rutas evaluadas.
