# 🔧 แก้ไข 500 Error: /api/tracking-tags

## ❌ ปัญหา

API endpoint `/api/tracking-tags` ส่งคืน **500 Internal Server Error**

**สาเหตุที่เป็นไปได้:**
1. `DATABASE_URL` บน Vercel ยังเป็น MySQL หรือไม่ถูกต้อง
2. Database schema ยังไม่ได้ push ไปยัง Neon database
3. Prisma Client ยังไม่ได้ generate สำหรับ Postgres

---

## ✅ วิธีแก้ไข

### 1. ตรวจสอบและแก้ไข DATABASE_URL บน Vercel

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. ไปที่ **Settings** > **Environment Variables**
3. หา `DATABASE_URL` และคลิก **Edit**
4. ตรวจสอบว่าเป็น **Postgres** connection string:
   ```
   postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
   ```
5. ถ้าไม่ใช่ → เปลี่ยนให้ถูกต้อง
6. คลิก **Save**

### 2. Push Database Schema

รันคำสั่งบน local machine:

```powershell
# 1. Pull environment variables
vercel env pull .env.local

# 2. ตรวจสอบ .env file (แก้ไขถ้ายังเป็น MySQL)
# เปลี่ยน DATABASE_URL เป็น Neon Postgres connection string

# 3. Generate Prisma Client
npx prisma generate

# 4. Push schema to database
npx prisma db push
```

### 3. Redeploy บน Vercel

```powershell
# Commit และ push
git add .
git commit -m "Fix: Update DATABASE_URL to Neon Postgres"
git push
```

หรือ:
- ไปที่ Vercel Dashboard
- คลิก **Deployments** > **Redeploy** (ล่าสุด)

---

## 🔍 ตรวจสอบ Error Logs

**ดู Vercel Logs:**
1. ไปที่ Vercel Dashboard > Project `wse-website`
2. คลิก **Deployments** > เลือก deployment ล่าสุด
3. คลิก **Functions** > `/api/tracking-tags`
4. ดู **Logs** เพื่อดู error message

---

## ✅ Checklist

- [ ] ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
- [ ] เปลี่ยนเป็น Neon Postgres connection string (ถ้ายังไม่ใช่)
- [ ] Pull env: `vercel env pull .env.local`
- [ ] แก้ไข `.env` file ให้ใช้ Postgres (ถ้ายังเป็น MySQL)
- [ ] Generate: `npx prisma generate`
- [ ] Push schema: `npx prisma db push`
- [ ] Redeploy บน Vercel
- [ ] ทดสอบ: https://wse-website.vercel.app/api/tracking-tags

---

## 💡 Connection String ที่ใช้

```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

หรือใช้:
```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

---

**เสร็จแล้ว!** 🎉
