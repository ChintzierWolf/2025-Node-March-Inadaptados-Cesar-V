# Guía de Pruebas POSTMAN: Autenticación y Administrador

Esta guía detalla los pasos exactos para registrar a tu primer usuario administrador y cómo iniciar sesión para obtener la "llave" (Token) que te permitirá crear las categorías.

---

## 1. REGISTRO (Crear al Administrador)
**Método:** `POST`
**URL:** `http://localhost:3000/api/auth/register`

Copia y pega este JSON en **Body > raw > JSON** de POSTMAN. Notarás que hemos incluido el campo `"role": "admin"`, lo cual le dirá a tu base de datos que este usuario tiene permisos totales.

```json
{
  "displayName": "César Admin",
  "email": "admin@tiendavideojuegos.com",
  "password": "Password123!",
  "phone": "5551234567",
  "role": "admin"
}
```
*(Al enviarlo, recibirás un mensaje de confirmación con los datos creados).*

---

## 2. LOGIN (Iniciar Sesión y Obtener Token)
**Método:** `POST`
**URL:** `http://localhost:3000/api/auth/login`

Una vez registrado, necesitamos hacer login para que el sistema nos genere el Token de seguridad. Envía el siguiente JSON con las credenciales que creamos arriba:

```json
{
  "email": "admin@tiendavideojuegos.com",
  "password": "Password123!"
}
```

**La respuesta será algo como esto:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. ¿Cómo usar el Token? (Muy Importante)
Copia toda esa cadena de texto larga que te devolvió el Login (sin las comillas).

1. Ve a tu petición de **Crear Categorías** (`POST /api/categories/categories`).
2. Haz clic en la pestaña **Authorization** (justo debajo de la barra de URL).
3. En el menú desplegable **Type**, selecciona **Bearer Token**.
4. En el recuadro que aparece a la derecha (**Token**), pega el código que copiaste.
5. ¡Envía la petición!

*(El Token dura 1 hora, si expira, solo tienes que volver a hacer Login y pegar el nuevo Token).*
