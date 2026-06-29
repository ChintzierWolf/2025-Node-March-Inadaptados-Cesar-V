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
