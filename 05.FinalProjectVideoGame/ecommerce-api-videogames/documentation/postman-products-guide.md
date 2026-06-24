# Guía de Pruebas POSTMAN: Poblar Productos

Esta guía te ayudará a insertar los primeros videojuegos, consolas y accesorios reales en tu base de datos.
Al igual que con las categorías, la creación de productos suele ser una tarea administrativa, sin embargo, el código actual tiene estas rutas abiertas. ¡Vamos a aprovecharlas!

---

## CREATE (Crear un Producto)
**Método:** `POST`
**URL:** `http://localhost:3000/api/products/products`

Copia y pega cada uno de estos JSON en **Body > raw > JSON**. 
> [!IMPORTANT]
> **No olvides** reemplazar el texto `"AQUI_PEGA_EL_ID_DE_LA_SUBCATEGORIA"` por el ID real que generaste en la guía de categorías (ej. el ID de la subcategoría "Xbox", "PlayStation" o "Accesorios").

### 1. Crear una Consola
```json
{
  "name": "Xbox Series X",
  "description": "La consola Xbox más rápida y potente de la historia.",
  "price": 499.99,
  "stock": 50,
  "imagesUrl": ["https://placehold.co/800x600.png"],
  "category": "AQUI_PEGA_EL_ID_DE_LA_SUBCATEGORIA_XBOX_DE_CONSOLAS",
  "platform": "Xbox",
  "genre": "Action",
  "releaseDate": "2020-11-10"
}
```

### 2. Crear un Videojuego
```json
{
  "name": "Halo Infinite",
  "description": "El legendario Jefe Maestro vuelve con la campaña de Halo más amplia hasta la fecha.",
  "price": 59.99,
  "stock": 200,
  "imagesUrl": ["https://placehold.co/800x600.png"],
  "category": "AQUI_PEGA_EL_ID_DE_LA_SUBCATEGORIA_XBOX_DE_VIDEOJUEGOS",
  "platform": "Xbox",
  "genre": "Shooter",
  "releaseDate": "2021-12-08"
}
```

### 3. Crear un Accesorio
```json
{
  "name": "Control Inalámbrico Xbox - Pulse Red",
  "description": "Experimenta el diseño modernizado del control inalámbrico Xbox.",
  "price": 64.99,
  "stock": 100,
  "imagesUrl": ["https://placehold.co/800x600.png"],
  "category": "AQUI_PEGA_EL_ID_DE_LA_CATEGORIA_O_SUBCATEGORIA_DE_ACCESORIOS",
  "platform": "Xbox",
  "genre": "Action",
  "releaseDate": "2021-02-09"
}
```

---

## READ (Consultar tus Productos)
**Método:** `GET`
**URL:** `http://localhost:3000/api/products/products`

Cuando envíes este GET, verás una lista con todos los productos que acabas de crear, y notarás que el sistema incluyó los detalles completos de la categoría gracias a la función interna (populate) de tu base de datos.
Guarda a la mano el ID del videojuego "Halo Infinite" (o el que hayas creado) para nuestra prueba del Carrito de Compras.
