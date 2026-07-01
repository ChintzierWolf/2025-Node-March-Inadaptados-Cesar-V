# Guía de Pruebas POSTMAN: Órdenes y Métodos de Pago

Para finalizar el ciclo de compra de tu E-Commerce, necesitamos simular el proceso final de Checkout. Este proceso consta de dos partes: registrar una tarjeta (Método de pago) y finalmente generar la Orden de Compra que consolida los productos del carrito.

---

## 1. CREATE (Registrar un Método de Pago)
**Método:** `POST`
**URL:** `http://localhost:3000/api/payment-methods/payment-methods`

Vamos a registrar una tarjeta de crédito para el cliente que usamos en el carrito.

**Cuerpo (JSON):**
```json
{
  "user": "AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER",
  "type": "credit_card",
  "cardNumber": "1234567812345678",
  "cardHolderName": "Juan Perez",
  "expiryDate": "12/28",
  "isDefault": true
}
```

Cópialo en **Body > raw > JSON** y dale *Send*. Obtendrás un código `201 Created`. 
> [!IMPORTANT]
> **Guarda el `_id` de este método de pago** recién creado. Lo necesitaremos obligatoriamente en el siguiente paso para asociarlo al cobro del pedido.

---

## 2. CREATE (Crear la Orden de Compra)
**Método:** `POST`
**URL:** `http://localhost:3000/api/orders`

En este paso, tomamos la información de los productos y generamos la Orden final. 
*Nota: Como el módulo de Direcciones de Envío (`shippingAddress`) aún no tiene una ruta en tu API para crear direcciones, usaremos un ID ficticio de 24 caracteres en este campo para cumplir con la validación obligatoria de MongoDB temporalmente.*

**Cuerpo (JSON):**
```json
{
  "user": "AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER",
  "paymentMethod": "AQUI_PEGA_EL_ID_DEL_METODO_DE_PAGO_QUE_ACABAS_DE_CREAR",
  "shippingAddress": "6a418534218d7607667942ff", 
  "shippingCost": 15.00,
  "products": [
    {
      "productId": "AQUI_PEGA_EL_ID_DEL_VIDEOJUEGO",
      "quantity": 2,
      "price": 59.99
    }
  ]
}
```

> **Explicación de los campos:** 
> - **user:** El ID de tu cliente.
> - **paymentMethod:** El ID de la tarjeta que registraste en el Paso 1.
> - **shippingAddress:** ID ficticio de Mongo (déjalo exactamente como está: `"6a418534218d7607667942ff"`).
> - **products:** La lista de productos que estás comprando (usa el ID, precio y cantidad del videojuego que agregaste al carrito anteriormente). 

Al presionar *Send*, tu controlador sumará automáticamente los precios multiplicados por la cantidad, le añadirá el costo de envío, y te devolverá un `201 Created` con el `totalPrice` calculado y el estado en `pending`.

---

¡Al concluir estos dos pasos habrás validado de inicio a fin todo el flujo de tu E-Commerce!
