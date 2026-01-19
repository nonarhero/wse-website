# 🔧 แก้ไข /api/tracking-tags 500 Error

## ✅ สถานะปัจจุบัน

- ✅ `/admin/login` - 200 OK (ใช้งานได้แล้ว!)
- ❌ `/api/tracking-tags` - 500 Error (ยังมีปัญหา)

---

## ❌ ปัญหา

`/api/tracking-tags` ส่งคืน **500 Internal Server Error**

**สาเหตุที่เป็นไปได้:**
1. `DATABASE_URL` บน Vercel ยังเป็น MySQL หรือไม่ถูกต้อง
2. ยังไม่ได้ Redeploy หลังจากแก้ไข Environment Variables
3. Database schema ยังไม่ได้ push ไปยัง Neon database

---

## ✅ วิธีแก้ไข

### 1. ตรวจสอบและแก้ไข DATABASE_URL บน Vercel

**ไปที่:** Vercel Dashboard > Project `wse-website` > Settings > Environment Variables

**ตรวจสอบว่า `DATABASE_URL` เป็น Neon Postgres connection string:**

```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

**ถ้ายังไม่ใช่:**
1. คลิก **Edit** บน `DATABASE_URL`
2. เปลี่ยนเป็น Neon Postgres connection string ข้างบน
3. **Environment:** เลือก **Production**, **Preview**, **Development** (ทั้งหมด)
4. คลิก **Save**

---

### 2. Redeploy (สำคัญ!)

**หลังจากแก้ไข Environment Variables แล้ว ต้อง Redeploy!**

#### วิธีที่ 1: ผ่าน Vercel Dashboard (ง่ายที่สุด)

1. ไปที่ **Deployments**
2. คลิก **...** (menu) บน deployment ล่าสุด
3. เลือก **Redeploy**
4. รอให้ deploy เสร็จ

#### วิธีที่ 2: ผ่าน Git Push

```powershell
# สร้าง commit เปล่าเพื่อ trigger redeploy
git commit --allow-empty -m "Trigger redeploy after DATABASE_URL update"
git push
```

---

### 3. ตรวจสอบ Vercel Logs

**ดู Error Logs:**

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. คลิก **Deployments** > เลือก deployment ล่าสุด
3. ดู **Functions** > `/api/tracking-tags` > **Logs**
4. หา error messages (มักจะเป็น red text)

**Error ที่พบบ่อย:**
- `Can't reach database server at 'host:3306'` → `DATABASE_URL` ยังเป็น MySQL
- `Invalid DATABASE_URL` → Connection string ไม่ถูกต้อง
- `PrismaClientInitializationError` → Database connection error

---

### 4. Push Database Schema (ถ้ายังไม่ได้ push)

รันคำสั่งบน local machine:

```powershell
# Pull environment variables
vercel env pull .env.local

# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push
```

---

## 📋 Checklist

- [ ] ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
- [ ] เปลี่ยนเป็น Neon Postgres connection string (ถ้ายังไม่ใช่)
- [ ] Save Environment Variable
- [ ] **Redeploy** (สำคัญ!)
- [ ] ตรวจสอบ Vercel Logs (Functions > `/api/tracking-tags` > Logs)
- [ ] ทดสอบ: https://wse-website.vercel.app/api/tracking-tags (ควรเป็น 200 OK)

---

## 🎯 สรุป

**ปัญหาหลัก:** `DATABASE_URL` บน Vercel ยังไม่ถูกต้อง หรือยังไม่ได้ Redeploy

**ขั้นตอน:**
1. ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
2. เปลี่ยนเป็น Neon Postgres connection string (ถ้ายังไม่ใช่)
3. **Redeploy** (สำคัญ!)
4. ตรวจสอบ Logs

---

## ✅ หลัง Redeploy แล้ว

ลองทดสอบ:
- https://wse-website.vercel.app/api/tracking-tags
- ควรเป็น **200 OK** (ไม่ใช่ 500 Error)

---

**ทำตามขั้นตอนนี้แล้วบอกผลลัพธ์!** 🔧
