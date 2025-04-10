# 📦 PrestaClaro – Backend API

API REST para simulación de préstamos personales.  
Construida con **Next.js (API Routes)**, **Prisma ORM**, **MySQL**, **Decimal.js**, **JWT** y estructura modular (controllers + middleware).

---

## 🚀 Tecnologías

- ⚙️ [Next.js](https://nextjs.org/)
- 🧬 [Prisma ORM](https://www.prisma.io/)
- 💾 MySQL
- 🔐 Bcrypt + JWT (seguridad)
- 📏 [decimal.js](https://mikemcl.github.io/decimal.js/)
- 🧪 Jest (tests unitarios)

---

## ⚙️ Instalación y configuración

```bash
git clone https://github.com/tu-org/prestaclaro-backend.git
cd prestaclaro-backend

cp .env.example .env   # Editar con tus credenciales de MySQL y JWT_SECRET

npm install
npx prisma generate
npx prisma migrate dev --name init

npm run dev
```

---

## 📁 Estructura del proyecto

```
/controllers
  ├── user.controller.ts
  └── simulation.controller.ts
/lib
  ├── prisma.ts
  ├── calculos.ts
  └── middleware/auth.ts
/pages/api
  ├── auth/
  │   ├── login.ts
  │   └── me.ts
  ├── usuario/
  │   ├── index.ts
  │   └── [id].ts
  ├── simulador.ts
  └── simulaciones/
      ├── index.ts
      └── [id].ts
```

---

## 🔐 Autenticación

### Registro

`POST /api/usuario`

```json
{
  "name": "Laura",
  "email": "laura@email.com",
  "telefono": "5512345678",
  "password": "laura123"
}
```

### Login

`POST /api/auth/login`

```json
{
  "email": "laura@email.com",
  "password": "laura123"
}
```

### Obtener usuario autenticado

`GET /api/auth/me`
Header:

```
Authorization: Bearer <token>
```

---

## 📡 Endpoints REST

### 👤 Usuario

- `GET /api/usuario/:id`
- `PUT /api/usuario/:id`

```json
{
  "name": "Nuevo Nombre",
  "telefono": "5500112233",
  "password": "nuevaClave"
}
```

- `DELETE /api/usuario/:id`

### 📊 Simulaciones

- `POST /api/simulador`

```json
{
  "amount": 10000,
  "months": 12,
  "userId": 1
}
```

- `GET /api/simulaciones?userId=1`
- `GET /api/simulaciones/:id`
- `PUT /api/simulaciones/:id`

```json
{
  "amount": 12000,
  "months": 10
}
```

- `DELETE /api/simulaciones/:id`

---

## 🧪 Tests

```bash
npm run test
```

- Tests de cálculo (`calcularCuota`) con `decimal.js`
- Validación de errores, precisión y redondeo

---

## 🔬 Pruebas desde VS Code (REST Client)

1. Instalar la extensión **REST Client** (autor: `humao`)
2. Abrir archivo: `api_test_requests.http`
3. Usar botones `Send Request` para ejecutar cada bloque

---

## 📄 Licencia

MIT © 2025 – Equipo PrestaClaro
