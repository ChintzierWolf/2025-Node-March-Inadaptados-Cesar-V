# Reto de la Semana: Creando To-Dos

¡Felicidades por completar la base de nuestro CRUD de Usuarios! Ahora es tu turno de aplicar lo aprendido para construir la funcionalidad principal de nuestra aplicación: la gestión de tareas o "To-Dos".

## 🎯 Objetivo

El objetivo de este reto es crear la estructura y la lógica inicial para crear To-Dos en nuestra API. Al final, deberás tener un nuevo endpoint funcionando:

- **POST** `/api/todos`: para crear una nueva tarea

Sigue la misma arquitectura que usamos para los usuarios: **Modelo**, **Controlador** y **Ruta**.

## 📁 Estructura del Proyecto

Al completar este reto, tu proyecto debería verse así:

```
ToDo-API-Repaso/
├── src/
│   ├── controllers/
│   │   ├── userController.js         (ya existe)
│   │   └── todoController.js         ← CREAR ESTE ARCHIVO
│   ├── models/
│   │   ├── user.js                   (ya existe)
│   │   └── todo.js                   ← CREAR ESTE ARCHIVO
│   └── routes/
│       ├── index.js                  (ya existe - MODIFICAR)
│       ├── userRoutes.js             (ya existe)
│       └── todoRoutes.js             ← CREAR ESTE ARCHIVO
├── package.json
└── server.js (o app.js)
```

## 📚 Guía Paso a Paso

### Paso 1: Crear el Modelo (todo.js)

Primero, necesitamos definir cómo se verá una "tarea" en nuestra base de datos.

1. Crea un nuevo archivo en la siguiente ubicación: `src/models/todo.js`
2. Dentro de este archivo, importa Mongoose
3. Define un nuevo Schema de Mongoose. Piensa en los campos que una tarea necesita:

#### Campos sugeridos:

- **team**: Debería ser un `ObjectId` que haga referencia al modelo 'Team'. ¡Es la forma de vincular la tarea a un equipo!
- **todoName**: Un `String` que será el título de la tarea. Hazlo obligatorio (`required: true`)
- **description**: Un `String` para dar más detalles. También debería ser obligatorio
- **createdBy** y **updatedBy**: Estos también serán `ObjectId` que harán referencia al modelo 'User'. Nos dirán quién creó y quién modificó la tarea por última vez
- **status**: Un `String` que puede tener valores predefinidos. Usa la propiedad `enum` para limitar las opciones a: `['assigned', 'doing', 'done', 'canceled']`. Dale un valor por defecto (`default`) de `'assigned'`

4. Finalmente, crea y exporta el modelo usando `mongoose.model('Todo', todoSchema)`

### Paso 2: Crear el Controlador (todoController.js)

Aquí es donde vivirá la lógica para manejar las peticiones relacionadas con los To-Dos.

1. Crea un nuevo archivo en `src/controllers/todoController.js`
2. Dentro, importa el modelo `Todo` que creaste en el paso anterior
3. Crea una función asíncrona y expórtala:

#### `createTodo(req, res)`

Esta función recibirá los datos de la nueva tarea desde `req.body`.

**Dentro de un bloque `try...catch` para manejar errores:**

- Extrae `team`, `todoName`, `description`, etc., del `req.body`
- Crea una nueva instancia de tu modelo: `const newTodo = new Todo({ ...datos... })`
- **Pista**: Los campos `createdBy` y `updatedBy` se pueden asignar con un ID de usuario hardcodeado por ahora, o si quieres ir más allá, puedes simular un usuario en el `req`
- Guarda la nueva tarea en la base de datos con `await newTodo.save()`
- Responde con un estado `201` y el objeto de la tarea recién creada

### Paso 3: Crear las Rutas (todoRoutes.js)

Ahora, vamos a exponer nuestro controlador al mundo exterior a través de un endpoint.

1. Crea un nuevo archivo en `src/routes/todoRoutes.js`
2. Importa Express y la función `createTodo` de tu nuevo controlador
3. Crea un router de Express
4. Define la ruta:
   - Una ruta **POST** para la URL base (`'/'`) que apunte a la función `createTodo`
5. Exporta el router

### Paso 4: Conectar Todo (index.js)

¡Casi terminamos! El último paso es decirle a nuestra aplicación principal que use las nuevas rutas que hemos creado.

1. Abre el archivo `src/routes/index.js`
2. Importa tu nuevo archivo de rutas:
   ```javascript
   import todoRoutes from './todoRoutes.js';
   ```
3. Dile al router principal que las use, añadiendo un prefijo:
   ```javascript
   router.use('/todos', todoRoutes);
   ```

## ✅ ¿Cómo Probarlo?

Usa **Postman** o **Thunder Client** para probar tu nuevo endpoint:

### Crear un To-Do

- **Método**: `POST`
- **URL**: `http://localhost:5000/api/todos`
- **Body (JSON)**: Envía un objeto con los campos que definiste en tu modelo
  
  ```json
  {
    "todoName": "Mi nueva tarea",
    "description": "Descripción de la tarea"
  }
  ```

- **Respuesta esperada**: Un código `201 Created` y el objeto del To-Do que acabas de crear

---

¡Mucho éxito con el reto! La próxima clase revisaremos la solución y continuaremos con las funcionalidades de leer, actualizar y eliminar.