# 🛒 API de Productos – Proyecto Final UTN

Este proyecto es una API RESTful desarrollada con **Node.js**, **Express**, **TypeScript** y **MongoDB**, que permite gestionar productos con autenticación de usuarios, validación con Zod, filtros avanzados, paginación y ordenamiento dinámico.

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

Instalar dependencias:

```bash
npm install

## ⚙️ Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con:

```
PORT=50000
MONGO_URI=
JWT_SECRET=
```

---

## ▶️ Ejecutar el proyecto

Modo desarrollo:

```bash
npm run dev
```

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
Obtiene productos del usuario logueado.  
Incluye:

- filtros (`minPrice`, `maxPrice`, `category`, `stockMin`, `name`)
- paginación (`page`, `limit`)
- ordenamiento (`sort=price_asc`, `sort=name_desc`, etc.)

Ejemplo:

```
GET /products?page=1&limit=10&sort=price_desc
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
  "stock": 10
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
- Los productos están asociados al usuario logueado.  
- La API está lista para integrarse con un frontend.  

---

## 👩‍💻 Autor

Proyecto desarrollado como parte del **Trabajo Práctico Final – UTN**.

