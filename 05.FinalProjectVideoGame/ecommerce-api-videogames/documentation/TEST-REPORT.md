# Registro de Pruebas de la API (TEST REPORT)

Este documento sirve como bitácora para llevar un control del progreso de las pruebas manuales realizadas a través de Postman. Marca con una `x` (`[x]`) las pruebas que vayas completando exitosamente.

## 1. 🧑‍💻 Autenticación (`postman-auth-guide.md`)
- [x] **POST** `/api/auth/register` - Registrar un usuario administrador.
- [x] **POST** `/api/auth/register` - Registrar un usuario cliente.
- [x] **POST** `/api/auth/login` - Iniciar sesión (Admin) y obtener Token.
- [x] **POST** `/api/auth/login` - Iniciar sesión (Cliente) y obtener Token.

## 2. 🗂️ Categorías (`postman-guide.md` - Categorías)
*Requiere: Token de Administrador*
- [x] **POST** `/api/categories/categories` - Crear categoría principal (ej. Videojuegos).
- [x] **POST** `/api/categories/categories` - Crear subcategoría (ej. Xbox, con `parentCategory`).
- [x] **GET** `/api/categories/categories` - Obtener todas las categorías.
- [x] **GET** `/api/categories/categories/:id` - Obtener una categoría por ID.
- [x] **PUT** `/api/categories/categories/:id` - Actualizar una categoría.
- [x] **DELETE** `/api/categories/categories/:id` - Eliminar una categoría.

## 3. 🎮 Productos (`postman-products-guide.md`)
*Requiere: Token de Administrador para crear/editar/eliminar*
- [x] **POST** `/api/products/products` - Crear un nuevo producto (Consola).
- [x] **POST** `/api/products/products` - Crear un nuevo producto (Videojuego).
- [x] **GET** `/api/products/products` - Obtener todos los productos.
- [x] **GET** `/api/products/products/:id` - Obtener un producto por ID.
- [x] **PUT** `/api/products/products/:id` - Actualizar información de un producto.
- [x] **DELETE** `/api/products/products/:id` - Eliminar un producto.

## 4. 🛒 Carrito de Compras (`postman-cart-guide.md`)
*Requiere: `userId` (Obtenido del Login) y `productId` (Obtenido de Productos)*
- [x] **POST** `/api/cart/cart/add-product` - Agregar un primer producto al carrito.
- [x] **POST** `/api/cart/cart/add-product` - Agregar el mismo producto para verificar que la cantidad (`quantity`) aumente.
- [x] **GET** `/api/cart/cart/user/:userId` - Consultar el carrito completo del usuario.

## 5. 📬 Notificaciones (Opcional / Próximamente)
- [ ] **GET** `/api/notifications/notifications/user/:userId` - Consultar notificaciones del usuario.

## 6. 📑 Pedidos y Métodos de Pago (Próximamente)
- [ ] **POST** `/api/payment-methods/payment-methods` - Registrar un método de pago.
- [ ] **POST** `/api/orders/orders` - Crear una orden de compra desde el carrito.

---
**Notas Adicionales / Observaciones de Pruebas:**
*(Espacio para que anotes cualquier bug, problema de validación o ajuste necesario durante tus pruebas)*

- 
- 
- 
