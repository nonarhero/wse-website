# 🗄️ วิธี Setup Database บน Vercel (2024)

## ⚠️ เปลี่ยนแล้ว: Vercel Postgres ย้ายไป Marketplace

Vercel Postgres ไม่มีใน "Vercel Native Storage" แล้ว แต่มีตัวเลือกที่ดีกว่าใน **Marketplace**!

---

## ✅ แนะนำ: ใช้ Neon (Serverless Postgres)

**ทำไมแนะนำ:**
- ✅ ฟรี (free tier)
- ✅ Serverless (ไม่ต้องจัดการ server)
- ✅ เข้ากันได้กับ Prisma 100%
- ✅ Setup ง่ายมาก

---

## 📋 ขั้นตอน Setup Neon

### 1. สร้าง Database บน Vercel Marketplace

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. คลิกแท็บ **Storage**
3. คลิก **Create Database**
4. เลื่อนลงไปดู **Marketplace Database Providers**
5. เลือก **Neon** (Serverless Postgres)
6. คลิก **Continue**

### 2. ตั้งชื่อและสร้าง

1. ตั้งชื่อ database (เช่น: `wse-db`)
2. เลือก Region (แนะนำ: `Southeast Asia` หรือ `US East`)
3. คลิก **Create**
4. รอสักครู่... Neon จะสร้าง database ให้
5. **Copy Connection String** (จะมีให้อัตโนมัติ)

### 3. เปลี่ยน Schema เป็น Postgres (ถ้ายังไม่ได้เปลี่ยน)

แก้ไข `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // เปลี่ยนจาก "mysql"
  url      = env("DATABASE_URL")
}
```

### 4. ตั้งค่า DATABASE_URL บน Vercel

1. ไปที่ **Settings** > **Environment Variables**
2. คลิก **Add New** (หรือแก้ไข `DATABASE_URL` ถ้ามีอยู่แล้ว)
3. **Key:** `DATABASE_URL`
4. **Value:** วาง **Connection String** จาก Neon
5. **Environment:** เลือกทั้งหมด (Production, Preview, Development)
6. คลิก **Save**

### 5. Setup Database Schema

```powershell
# 1. Pull environment variables
vercel env pull .env.local

# 2. Generate Prisma Client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. สร้าง Admin User
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

### 6. Redeploy

```powershell
git add .
git commit -m "Switch to Neon Postgres for testing"
git push
```

---

## 🆚 เปรียบเทียบ Marketplace Providers

| Provider | Type | ฟรี? | เหมาะกับ |
|----------|------|------|----------|
| **Neon** | Serverless Postgres | ✅ ใช่ | **แนะนำ - ทดสอบและใช้งานทั่วไป** |
| **Supabase** | Postgres + Extras | ✅ ใช่ | ต้องการ features เพิ่ม (Auth, Storage) |
| **AWS** | PostgreSQL/NoSQL | ❌ ไม่ฟรี | Production ขนาดใหญ่ |
| **Upstash** | Redis/Vector | ✅ ใช่ | Cache, Real-time |

---

## 🔄 ตัวเลือกอื่น: Supabase

ถ้าต้องการ **Supabase** (ก็ใช้ Postgres เหมือนกัน):

### ขั้นตอนเหมือนกัน แต่:

1. เลือก **Supabase** แทน Neon
2. จะต้อง sign up Supabase account (ฟรี)
3. Connection string จะมาจาก Supabase dashboard

**Supabase ดีกว่า Neon ถ้า:**
- ต้องการ Auth system
- ต้องการ File storage
- ต้องการ Real-time features

**สำหรับการทดสอบ: Neon ง่ายกว่า!**

---

## ✅ Checklist

- [ ] เลือก Neon จาก Marketplace
- [ ] Copy connection string
- [ ] แก้ไข `schema.prisma` เป็น `postgresql`
- [ ] ตั้งค่า `DATABASE_URL` บน Vercel
- [ ] Pull env: `vercel env pull .env.local`
- [ ] Generate: `npx prisma generate`
- [ ] Push: `npx prisma db push`
- [ ] Create admin: `npm run create-admin`
- [ ] Redeploy
- [ ] ทดสอบ login

---

## 💡 คำแนะนำ

**สำหรับลูกค้าเทส:**
- ใช้ **Neon** (ง่ายที่สุด, ฟรี, ใช้งานได้ดี)

**สำหรับ Production:**
- Neon ยังใช้ได้ (free tier ดีมาก)
- หรือย้ายไป VPS + MySQL ถ้าต้องการควบคุมเอง

---

## ❓ FAQ

**Q: Neon ฟรีจริงไหม?**
A: ฟรี! มี free tier ดีมากสำหรับทดสอบและใช้งานเล็ก-กลาง

**Q: ข้อมูลจะหายไหม?**
A: ไม่หาย Neon เป็น managed service ข้อมูลปลอดภัย

**Q: เปลี่ยนกลับ MySQL ได้ไหม?**
A: ได้ แต่ต้อง export/import ข้อมูลก่อน

**Q: ต้องลงทะเบียน Neon แยกไหม?**
A: ไม่ต้อง! Vercel จัดการให้ (integration)

---

## 📝 Quick Commands

```powershell
# Pull env
vercel env pull .env.local

# Setup
npx prisma generate
npx prisma db push

# Create admin
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

---

**เสร็จแล้ว!** 🎉
