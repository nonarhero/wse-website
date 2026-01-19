# ⚡ วิธี Setup ง่ายที่สุด - สำหรับลูกค้าเทส

## 🎯 แนะนำ: ใช้ Neon (Serverless Postgres) - 5 นาที

**ทำไมแนะนำ:**
- ✅ ไม่ต้อง setup server เอง
- ✅ ไม่ต้องจัดการ firewall
- ✅ ไม่ต้องตั้งค่า MySQL
- ✅ ฟรี (free tier)
- ✅ ใช้งานได้ทันที

**หมายเหตุ:** Vercel Postgres ไม่มีใน Native Storage แล้ว แต่มี **Neon** ใน Marketplace ที่ดีกว่า!

---

## 📋 ขั้นตอนทั้งหมด (5 นาที)

### 1. สร้าง Database บน Vercel Marketplace (2 นาที)

1. ไปที่ **Vercel Dashboard** > https://vercel.com/dashboard
2. เลือก Project **wse-website**
3. คลิกแท็บ **Storage** (ด้านบน)
4. คลิก **Create Database**
5. เลื่อนลงไปดู **Marketplace Database Providers**
6. เลือก **Neon** (Serverless Postgres) - มี icon สีเขียว
7. คลิก **Continue**
8. ตั้งชื่อ: `wse-db` (หรือชื่ออะไรก็ได้)
9. เลือก Region (แนะนำ: `Southeast Asia` หรือ `US East`)
10. คลิก **Create**
11. รอสักครู่... Neon จะสร้าง database ให้
12. **Copy Connection String** (จะมีให้อัตโนมัติ)

### 2. เปลี่ยน Schema เป็น Postgres (30 วินาที)

แก้ไขไฟล์ `prisma/schema.prisma`:

**เปลี่ยนบรรทัดนี้:**
```prisma
datasource db {
  provider = "postgresql"  // เปลี่ยนจาก "mysql"
  url      = env("DATABASE_URL")
}
```

### 3. ตั้งค่า DATABASE_URL บน Vercel (1 นาที)

1. ไปที่ **Settings** > **Environment Variables**
2. หา `DATABASE_URL` (ถ้ามี) หรือคลิก **Add New**
3. **Key:** `DATABASE_URL`
4. **Value:** วาง **Connection String** ที่ copy มา
5. **Environment:** เลือกทั้งหมด (**Production**, **Preview**, **Development**)
6. คลิก **Save**

### 4. Setup Database (2 นาที)

รันคำสั่งใน PowerShell:

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

### 5. Redeploy (1 นาที)

```powershell
git add .
git commit -m "Switch to Postgres for easy testing"
git push
```

หรือ:
- ไปที่ Vercel Dashboard
- คลิก **Deployments** > **Redeploy** (ล่าสุด)

---

## ✅ ตรวจสอบว่าสำเร็จ

1. ไปที่ https://wse-website.vercel.app/admin/login
2. Login ด้วย:
   - **Email:** `admin@wse.com`
   - **Password:** `Password123`
3. ถ้าเข้าได้ = สำเร็จ! 🎉

---

## 🔄 ถ้าต้องการใช้ MySQL จริง (VPS)

ใช้ตามคู่มือ `MYSQL_SERVER_SETUP.md` แต่จะใช้เวลามากกว่า

---

## 📊 เปรียบเทียบ

| | Vercel Postgres | VPS + MySQL |
|---|---|---|
| **เวลา Setup** | 5 นาที | 30-60 นาที |
| **ความยาก** | ⭐ ง่ายมาก | ⭐⭐⭐ |
| **ต้อง Setup Server** | ❌ ไม่ต้อง | ✅ ต้อง |
| **Firewall** | ❌ ไม่ต้อง | ✅ ต้อง |
| **เหมาะกับ** | ทดสอบ | Production |

---

## 💡 คำแนะนำ

**สำหรับลูกค้าเทส:** ใช้ **Vercel Postgres** (วิธีนี้)
- ง่าย เร็ว ไม่มีปัญหา
- พอทดสอบเสร็จแล้ว ถ้าต้องการ MySQL จริง ค่อยย้ายทีหลัง

---

## ❓ ถ้ามีปัญหา

**Error: "Can't reach database"**
- ตรวจสอบว่า copy connection string ถูกต้อง
- ตรวจสอบว่า DATABASE_URL บน Vercel ถูกต้อง

**Error: "Schema mismatch"**
- ตรวจสอบว่าเปลี่ยน `provider = "postgresql"` แล้ว
- รัน `npx prisma generate` และ `npx prisma db push` ใหม่

---

## 📝 Checklist

- [ ] สร้าง Postgres database บน Vercel
- [ ] Copy connection string
- [ ] แก้ไข `prisma/schema.prisma` เป็น `postgresql`
- [ ] ตั้งค่า `DATABASE_URL` บน Vercel
- [ ] Pull env: `vercel env pull .env.local`
- [ ] Generate: `npx prisma generate`
- [ ] Push: `npx prisma db push`
- [ ] Create admin: `npm run create-admin`
- [ ] Redeploy
- [ ] ทดสอบ login

**เสร็จแล้ว!** 🎉
