# Guía de Pruebas POSTMAN: Carrito de Compras

Esta guía simula a un cliente agregando videojuegos o consolas a su carrito de compras en la tienda.

---

## ADD PRODUCT (Agregar Producto al Carrito)
**Método:** `POST`
**URL:** `http://localhost:3000/api/cart/cart/add-product`

Para agregar un producto al carrito, el sistema necesita saber **quién es el usuario** y **qué producto quiere comprar**. 

> [!TIP]
> **¿De dónde saco los IDs?**
> - **userId**: Ve a POSTMAN, haz un `POST /api/auth/login` con tu usuario administrador (o registra uno nuevo de cliente) y copia el valor de "userId" que decodificaste o busca el usuario en la BD. Si solo tienes el Token, el controlador actual exige el `userId` en el JSON. (Si no tienes a la mano el ID de tu usuario, puedes hacer un pequeño truco: ve al compendio de tu base de datos en MongoDB o decodifica tu JWT en jwt.io).
> - **productId**: Saca el ID del videojuego que creaste en la guía de Productos (ej. el ID de Halo Infinite).

En **Body > raw > JSON**, pega lo siguiente:

```json
{
  "userId": "AQUI_PEGA_EL_ID_DE_TU_USUARIO",
  "productId": "AQUI_PEGA_EL_ID_DEL_VIDEOJUEGO",
  "quantity": 1
}
```

Al enviar esto, el sistema responderá con el carrito completo. Si vuelves a enviar exactamente la misma petición, notarás que la "quantity" (cantidad) de ese producto subirá a 2. ¡El carrito acumula los artículos automáticamente!

---

## READ (Consultar el Carrito de un Usuario)
**Método:** `GET`
**URL:** `http://localhost:3000/api/cart/cart/user/AQUI_PEGA_EL_ID_DE_TU_USUARIO`

Cuando el cliente entra a la página de "Mi Carrito", el Frontend envía esta petición para obtener todos los productos y sumar el total a pagar.

*(Nota: Fíjate que en las rutas el prefijo es `/api/cart` y luego sigue `/cart/...` por cómo está estructurado el archivo `index.js` del proyecto original).*
