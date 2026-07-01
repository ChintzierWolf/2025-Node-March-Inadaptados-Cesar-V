# Guía de Pruebas POSTMAN: Categorías y Subcategorías

Esta guía contiene la estructura exacta de las peticiones que debes configurar en POSTMAN para realizar el CRUD de las categorías y crear las ramas que hemos planeado.

> [!IMPORTANT]
> **Requisito Previo de Autenticación**
> Las rutas para crear (`POST`), actualizar (`PUT`) y borrar (`DELETE`) categorías están protegidas en tu código por los middlewares `authMiddleware` y `isAdmin`. 
> Esto significa que antes de poder enviarlas con éxito, deberás crear un usuario con el rol `admin`, iniciar sesión (`POST /api/auth/login`) para obtener tu **Token JWT**, e incluir ese token en la pestaña **Authorization > Bearer Token** de las peticiones de POSTMAN.

---

## 1. CREATE (Crear Categorías Principales)
**Método:** `POST`
**URL:** `http://localhost:3000/api/categories/categories`

Copia y pega cada uno de estos bloques (uno a la vez) en la pestaña **Body > raw > JSON** de POSTMAN para crear las 4 ramas principales.

**Consolas:**
```json
{
  "name": "Consolas",
  "description": "Plataformas de hardware de videojuegos",
  "imageURL": "https://placehold.co/800x600.png"
}
```

**Videojuegos:**
```json
{
  "name": "Videojuegos",
  "description": "Catálogo de títulos y software",
  "imageURL": "https://placehold.co/800x600.png"
}
```

**Accesorios:**
```json
{
  "name": "Accesorios",
  "description": "Periféricos y complementos",
  "imageURL": "https://placehold.co/800x600.png"
}
```

**Más Productos:**
```json
{
  "name": "Más Productos",
  "description": "Coleccionables, merchandising y más",
  "imageURL": "https://placehold.co/800x600.png"
}
```

---

## 2. READ (Obtener todas las Categorías para ver sus IDs)
**Método:** `GET`
**URL:** `http://localhost:3000/api/categories/categories`
*(Esta ruta es pública, no requiere token).*

Al enviar esta petición, POSTMAN te responderá con una lista de las categorías creadas. Busca el campo `_id` de la categoría "Consolas" y cópialo, lo necesitaremos para el siguiente paso.

---

## 3. CREATE (Crear Subcategorías)
**Método:** `POST`
**URL:** `http://localhost:3000/api/categories/categories`

Ahora vamos a crear una subcategoría "Xbox" que pertenezca a "Consolas". En el cuerpo, incluiremos el campo `parentCategory` con el ID que copiaste en el paso anterior.

**Ejemplo de Subcategoría Xbox (Bajo Consolas):**
```json
{
  "name": "Xbox",
  "description": "Consolas de la familia Microsoft",
  "parentCategory": "AQUI_PEGA_EL_ID_DE_CONSOLAS"
}
```
*Repite este proceso para PlayStation, Nintendo, etc., siempre cambiando el `parentCategory` por el ID del padre correspondiente.*

---

## 4. READ (Obtener una Categoría por ID)
**Método:** `GET`
**URL:** `http://localhost:3000/api/categories/categories/AQUI_PEGA_EL_ID_DE_LA_CATEGORIA`
*(Esta ruta es pública, no requiere token).*

Al enviar esta petición, POSTMAN te responderá con los detalles únicos de esa categoría en específico. Es útil para confirmar que la información guardada es correcta.

---

## 5. UPDATE (Actualizar una Categoría)
**Método:** `PUT`
**URL:** `http://localhost:3000/api/categories/categories/AQUI_PEGA_EL_ID_A_EDITAR`

Si te equivocaste en un nombre o quieres actualizar la imagen, usa `PUT` con la URL apuntando al ID específico de la categoría.

**Cuerpo:**
```json
{
  "name": "Consolas y Portátiles"
}
```

---

## 6. DELETE (Borrar una Categoría)
**Método:** `DELETE`
**URL:** `http://localhost:3000/api/categories/categories/AQUI_PEGA_EL_ID_A_BORRAR`

Esta petición borrará la categoría de la base de datos. No requiere cuerpo JSON, solo enviar la petición.
