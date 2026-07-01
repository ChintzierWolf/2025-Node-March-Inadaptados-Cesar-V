# Guía de Pruebas POSTMAN: Notificaciones

Las notificaciones en un E-Commerce generalmente se crean automáticamente (por ejemplo, cuando tu pedido es enviado o cambia de estado), pero para propósitos de prueba, nuestra API expone una ruta para crearlas manualmente y así poder probar la lectura de las mismas de manera aislada.

---

## 1. CREATE (Crear una Notificación para un Usuario)
**Método:** `POST`
**URL:** `http://localhost:3000/api/notifications/notifications`

Este endpoint nos permitirá inyectar una notificación simulando que el sistema le está avisando algo al cliente.

**Cuerpo (JSON):**
```json
{
  "user": "AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER",
  "message": "¡Tu orden #1234 ha sido enviada con éxito!"
}
```

Copia el cuerpo, pégalo en **Body > raw > JSON**, y dale *Send*. Deberías recibir un código `201 Created` con los detalles de la nueva notificación.

---

## 2. READ (Consultar las Notificaciones del Usuario)
*(Esta es la prueba principal solicitada en tu archivo TEST-REPORT.md)*

**Método:** `GET`
**URL:** `http://localhost:3000/api/notifications/notifications/user/AQUI_PEGA_EL_ID_DE_TU_USUARIO_CUSTOMER`

Al enviar esta petición, el sistema te devolverá una lista con todas las notificaciones que le pertenecen a ese cliente específico. Notarás que la notificación que acabas de crear tiene el campo `"isRead": false`.

---

## 3. UPDATE (Marcar Notificación como Leída) - Extra
**Método:** `PATCH`
**URL:** `http://localhost:3000/api/notifications/notifications/AQUI_PEGA_EL_ID_DE_LA_NOTIFICACION/mark-read`

Si copias el `_id` de la notificación recién generada y lo pegas en esta URL, podrás marcarla como leída. No requiere cuerpo JSON, solo presiona *Send* y verás que el campo `"isRead"` cambia a `true`.
