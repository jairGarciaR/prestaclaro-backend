# 📦 PrestaClaro – Backend API

API REST para simulación de préstamos personales.  
Construida con **Next.js (API Routes)**, **Prisma ORM**, **MySQL** y **Decimal.js** para máxima precisión financiera.

---

## 🚀 Tecnologías

- ⚙️ [Next.js](https://nextjs.org/)
- 🧬 [Prisma ORM](https://www.prisma.io/)
- 💾 MySQL
- 📏 [decimal.js](https://mikemcl.github.io/decimal.js/)
- 🧪 Jest (tests unitarios)

---

## ⚙️ Instalación y configuración

```bash
git clone https://github.com/jairGarciaR/prestaclaro-backend
cd prestaclaro-backend

cp .env.example .env

npm install
npx prisma generate
npx prisma migrate dev --name init

npm run dev
```
