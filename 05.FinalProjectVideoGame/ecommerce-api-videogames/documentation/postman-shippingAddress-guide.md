# Guía de Pruebas POSTMAN: Direcciones de Envío (Bonus)

Con el módulo recién integrado de Direcciones de Envío, ya no necesitas usar IDs ficticios para crear las Órdenes de Compra. Ahora puedes registrar domicilios reales para los clientes.

---

## 1. CREATE (Registrar Dirección de Envío)
**Método:** `POST`
**URL:** `http://localhost:3000/api/shipping-addresses`
*(No olvides colocar el Token del cliente en la pestaña Authorization > Bearer Token)*

Vamos a registrar una dirección real para tu cliente.

**Cuerpo (JSON):**
```json
{
  "user": "AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER",
  "name": "Juan Perez",
  "address": "Av. Reforma 123",
  "city": "Ciudad de México",
  "state": "CDMX",
  "postalCode": "11000",
  "phone": "5551234567",
  "isDefault": true,
  "addressType": "home"
}
```
*Cópialo en **Body > raw > JSON** y dale **Send**. Deberías obtener un `201 Created`.*
> [!IMPORTANT]
> **Guarda el `_id` generado**. A partir de ahora, puedes usar ESTE ID legítimo en el campo `"shippingAddress"` cuando vayas a crear una nueva Orden de Compra (`POST /api/orders`).

---

## 2. READ (Consultar Direcciones del Usuario)
**Método:** `GET`
**URL:** `http://localhost:3000/api/shipping-addresses/user/AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER`

*Dale Send. Obtendrás un arreglo con todas las direcciones registradas a nombre de ese cliente específico.*

---

## 3. CREATE (Crear Orden de Compra usando la nueva Dirección)
**Método:** `POST`
**URL:** `http://localhost:3000/api/orders`
*(No olvides colocar el Token del cliente en la pestaña Authorization > Bearer Token)*

Ahora que tienes una dirección real registrada, utilicemos ese ID legítimo para generar tu Orden de Compra final.

**Cuerpo (JSON):**
```json
{
  "user": "AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER",
  "shippingAddress": "AQUI_PEGA_EL_ID_DE_LA_DIRECCION_QUE_ACABAS_DE_CREAR",
  "paymentMethod": "AQUI_PEGA_EL_ID_DE_TU_METODO_DE_PAGO",
  "products": [
    {
      "productId": "AQUI_PEGA_EL_ID_DE_UN_PRODUCTO",
      "quantity": 1,
      "price": 150.50
    }
  ],
  "shippingCost": 0
}
```
*Asegúrate de incluir explícitamente el arreglo de `products` con al menos un producto válido, ya que este endpoint requiere saber qué se está comprando y su precio. Cópialo en **Body > raw > JSON** y dale **Send**. ¡Deberías obtener un `201 Created` con tu orden exitosamente vinculada a una dirección real!*
