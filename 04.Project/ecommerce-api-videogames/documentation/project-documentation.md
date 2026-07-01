# Documentación del Proyecto: E-Commerce API Videogames

## Descripción del Proyecto
`ecommerce-api-videogames` es una API RESTful robusta diseñada como el backend principal de una plataforma de comercio electrónico especializada en la venta de videojuegos, consolas y accesorios. Provee la lógica de negocio completa para la gestión de inventario, carritos de compras, registro de usuarios, y procesamiento de órdenes de venta.

## Estado Actual
**Fase de Backend: 100% Completada.**
Todos los flujos principales (desde el registro de usuarios hasta la creación de una orden de compra final vinculada a direcciones y métodos de pago reales) han sido codificados y validados exitosamente mediante pruebas manuales en Postman. El proyecto se encuentra en un estado maduro y listo para la fase de **Integración con Frontend**.

## Stack Tecnológico
El ecosistema de la API está construido sobre las siguientes tecnologías y dependencias principales:
*   **Entorno de Ejecución:** Node.js
*   **Framework Web:** Express.js
*   **Base de Datos:** MongoDB (NoSQL)
*   **ODM (Mapeo de Datos):** Mongoose
*   **Seguridad y Autenticación:** JSON Web Tokens (JWT) y bcrypt (encriptación de contraseñas).
*   **Validación de Datos:** express-validator
*   **Utilidades:** dotenv (variables de entorno), chalk (logs visuales), nodemon (desarrollo).

## Arquitectura de Software
La API está estructurada bajo el patrón arquitectónico **M-C-R (Models, Controllers, Routes)** para una clara separación de responsabilidades, complementado con el uso intensivo de **Middlewares**:

*   **Models:** Definen la estructura de los datos (esquemas) y la interacción directa con MongoDB.
*   **Controllers:** Contienen la lógica de negocio pura; procesan las solicitudes, interactúan con los modelos y devuelven respuestas HTTP.
*   **Routes:** Definen y agrupan los endpoints (URLs) disponibles, delegando el trabajo a los controladores correspondientes.
*   **Middlewares:** Actúan como interceptores para validar datos (express-validator), manejar errores globales (catch-all), y proteger rutas (autorización por roles de `admin`/`customer` y validación de tokens JWT).

## Estructura de Directorios
```text
ecommerce-api-videogames/
├── package.json          # Metadatos y dependencias
├── server.js             # Punto de entrada y configuración de Express
├── documentation/        # Documentación técnica y guías de Postman
├── logs/                 # Registros del sistema
└── src/                  # Código fuente de la API
    ├── config/           # Conexión a la base de datos (database.js)
    ├── controllers/      # Lógica de los endpoints CRUD
    ├── middlewares/      # Validadores, manejo de errores, y seguridad
    ├── models/           # Esquemas de Mongoose
    └── routes/           # Rutas RESTful centralizadas en index.js
```

## Dominio de Datos (Entidades Principales)
La base de datos maneja múltiples colecciones para abarcar todo el ciclo de vida del e-commerce:

1.  **Catálogo:** `Product` (Artículos a la venta) y `Category` (Estructura de catálogo que soporta subcategorías).
2.  **Usuarios y Logística:** `User` (Administradores y Clientes con sus respectivos permisos) y `ShippingAddress` (Direcciones de envío del cliente).
3.  **Transacciones Comerciales:** `Cart` (Gestión del carrito de compras en tiempo real), `Order` (Órdenes de compra consolidadas) y `PaymentMethod` (Medios de pago registrados).
4.  **Interacción del Cliente:** `Notification` (Sistema de alertas), `Review` (Reseñas de productos) y `WishList` (Listas de deseos).
