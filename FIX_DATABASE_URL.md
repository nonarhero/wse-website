# 🔧 แก้ไข DATABASE_URL - เปลี่ยนจาก MySQL เป็น Neon Postgres

## ❌ ปัญหาปัจจุบัน

`DATABASE_URL` ยังชี้ไป MySQL ที่ไม่ถูกต้อง:
```
DATABASE_URL="mysql://root:bsn_industry2521@host:3306/wse"
```
- `host:3306` ไม่ใช่ IP จริง - ไม่สามารถเชื่อมต่อได้
- ยังใช้ MySQL แทน Postgres

## ✅ วิธีแก้ไข

### วิธีที่ 1: แก้ไขบน Vercel Dashboard (แนะนำ)

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. ไปที่ **Settings** > **Environment Variables**
3. หา `DATABASE_URL` และคลิก **Edit**
4. เปลี่ยน **Value** จาก:
   ```
   mysql://root:bsn_industry2521@host:3306/wse
   ```
   เป็น:
   ```
   postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
   ```
5. คลิก **Save**

### วิธีที่ 2: แก้ไข .env.local เอง

แก้ไขไฟล์ `.env.local`:

**เปลี่ยนบรรทัดนี้:**
```env
DATABASE_URL="mysql://root:bsn_industry2521@host:3306/wse"
```

**เป็น:**
```env
DATABASE_URL="postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"
```

---

## ✅ ตรวจสอบว่า schema.prisma เป็น Postgres แล้ว

ไฟล์ `prisma/schema.prisma` ควรเป็น:

```prisma
datasource db {
  provider = "postgresql"  // ✅ เปลี่ยนเป็น postgresql แล้ว
  url      = env("DATABASE_URL")
}
```

**ถ้ายังไม่ได้เปลี่ยน** แก้ไขเป็น `postgresql`

---

## 🚀 Setup Database หลังจากแก้ไข

```powershell
# 1. Pull environment variables ใหม่ (ถ้าแก้บน Vercel)
vercel env pull .env.local

# 2. Generate Prisma Client
npx prisma generate

# 3. Push schema to database
npx prisma db push

# 4. สร้าง Admin User
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

---

## ✅ Checklist

- [ ] เปลี่ยน `DATABASE_URL` บน Vercel Dashboard (หรือใน `.env.local`)
- [ ] ตรวจสอบว่า `schema.prisma` เป็น `postgresql`
- [ ] Pull env: `vercel env pull .env.local` (ถ้าแก้บน Vercel)
- [ ] Generate: `npx prisma generate`
- [ ] Push: `npx prisma db push`
- [ ] Create admin: `npm run create-admin`
- [ ] ทดสอบ login: https://wse-website.vercel.app/admin/login

---

## 💡 Connection String ที่ใช้

ใช้ `wse_POSTGRES_PRISMA_URL` ที่ Vercel generate ให้:
```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

หรือ `wse_POSTGRES_URL` (ไม่มี connect_timeout):
```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

ทั้งสองตัวใช้ได้!

---

**เสร็จแล้ว!** 🎉
