# 🛒 API de Productos – Proyecto Final UTN

Esta es una API RESTful desarrollada con **Node.js**, **Express**, **TypeScript** y **MongoDB**, que permite gestionar productos asociados a un usuario autenticado.  
Incluye autenticación con JWT, validación con Zod, filtrado por query params y paginación.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express  
- TypeScript  
- MongoDB + Mongoose  
- Zod (validación de datos)  
- JWT (autenticación)  
- Bcrypt (hash de contraseñas)  
- Dotenv  
- CORS  

---

## 📦 Instalación

Clonar el repositorio:

```bash
git clone https://github.com/rocioayuntamagi/proyecto-final-utn
```

Instalar dependencias:

```bash
npm install
```

---

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

```
PORT=50000
MONGO_URI=TU_CONEXION_A_MONGO
JWT_SECRET=TU_SECRETO
```

---

## ▶️ Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

---

## 🔐 Autenticación

La API utiliza **JWT**.  
Para acceder a las rutas protegidas, enviar en los headers:

```
Authorization: Bearer TU_TOKEN
```

---

## 📚 Endpoints

### 🔸 Auth

#### **POST /auth/register**  
Registra un nuevo usuario.

#### **POST /auth/login**  
Devuelve un token JWT.

---

### 🔸 Products (protegido por JWT)

#### **GET /products**  
Obtiene los productos del usuario logueado.

Incluye:

- **Filtrado mínimo obligatorio**  
  - `name` → filtra por coincidencia parcial  
  - `category` → filtra por categoría exacta  

- **Paginación**  
  - `page`  
  - `limit`  

Ejemplos:

```
GET /products?page=1
GET /products?name=ropa
GET /products?category=electro
GET /products?page=2&name=heladera
```

---

#### **GET /products/:id**  
Obtiene un producto por ID.

---

#### **POST /products**  
Crea un producto.  
Validado con Zod.

Body ejemplo:

```json
{
  "name": "Teclado",
  "price": 15000,
  "category": "Periféricos",
  "stock": 10,
  "description": "Teclado mecánico retroiluminado"
}
```

---

#### **PATCH /products/:id**  
Actualiza un producto.  
Validación parcial con Zod.

---

#### **DELETE /products/:id**  
Elimina un producto.

---

## 🧪 Validación con Zod

- Validación de **body** en POST y PATCH  
- Validación de **query params** en GET /products  
- Manejo de errores consistente  

---

## 📁 Estructura del proyecto

```
src/
  controllers/
  interfaces/
  middleware/
  models/
  routes/
  schemas/
  index.ts
```

---

## 📝 Notas

- Todas las rutas de productos requieren token JWT.  
- Cada producto está asociado al usuario que lo creó.  
- La API está lista para integrarse con un frontend.  
- Incluye filtrado mínimo obligatorio para cumplir la consigna del TP.  

---

## 👩‍💻 Autor

Proyecto desarrollado por **Rocío Ayunta** como parte del **Trabajo Práctico Final – UTN**.


