# 🔧 แก้ไขหน้า Admin Login ขาว (Blank Page)

## ❌ ปัญหา

หน้า `/admin/login` เป็นหน้าขาว (blank page) ไม่มีอะไรแสดง

---

## 🔍 สาเหตุที่เป็นไปได้

1. **Environment Variables บน Vercel ยังไม่ถูกต้อง**
   - `DATABASE_URL` ยังเป็น MySQL (`mysql://...@host:3306/wse`)
   - `NEXTAUTH_URL` ไม่ตรงกับ domain

2. **ยังไม่ได้ Redeploy**
   - แก้ไข Environment Variables แล้ว แต่ยังไม่ได้ Redeploy
   - Environment Variables ไม่มีผลทันที - ต้อง Redeploy

3. **Runtime Error**
   - Database connection error
   - Prisma Client error
   - NextAuth error

4. **Build Error**
   - TypeScript error
   - Missing dependencies

---

## ✅ วิธีแก้ไข

### 1. ตรวจสอบ Environment Variables บน Vercel

**ไปที่:** Vercel Dashboard > Project `wse-website` > Settings > Environment Variables

**ตรวจสอบว่า:**

#### DATABASE_URL
ควรเป็น Neon Postgres connection string:
```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

**ถ้ายังไม่ใช่:**
1. คลิก **Edit** บน `DATABASE_URL`
2. เปลี่ยนเป็น Neon Postgres connection string ข้างบน
3. **Environment:** เลือก **Production**, **Preview**, **Development** (ทั้งหมด)
4. คลิก **Save**

#### NEXTAUTH_URL
ควรเป็น:
```
https://wse-website.vercel.app
```

**ถ้ายังไม่ใช่:**
1. คลิก **Edit** บน `NEXTAUTH_URL`
2. เปลี่ยนเป็น `https://wse-website.vercel.app`
3. **Environment:** เลือกทั้งหมด
4. คลิก **Save**

---

### 2. ตรวจสอบ Vercel Logs

**ดู Error Logs:**

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. คลิก **Deployments** > เลือก deployment ล่าสุด
3. ดู **Functions** > `/admin/login` หรือ **Logs**
4. หา error messages (มักจะเป็น red text)

**Error ที่พบบ่อย:**
- `Can't reach database server at 'host:3306'` → `DATABASE_URL` ยังเป็น MySQL
- `Invalid DATABASE_URL` → Connection string ไม่ถูกต้อง
- `PrismaClientInitializationError` → Database connection error

---

### 3. Redeploy (สำคัญ!)

**หลังจากแก้ไข Environment Variables แล้ว ต้อง Redeploy!**

#### วิธีที่ 1: ผ่าน Vercel Dashboard (ง่ายที่สุด)

1. ไปที่ **Deployments**
2. คลิก **...** (menu) บน deployment ล่าสุด
3. เลือก **Redeploy**
4. หรือคลิก **Redeploy** ปุ่มที่เห็น
5. รอให้ deploy เสร็จ

#### วิธีที่ 2: ผ่าน Git Push

```powershell
# สร้าง commit เปล่าเพื่อ trigger redeploy
git commit --allow-empty -m "Trigger redeploy after env vars update"
git push
```

---

### 4. ตรวจสอบ Browser Console

**ดู Client-Side Errors:**

1. เปิด https://wse-website.vercel.app/admin/login
2. กด **F12** (เปิด Developer Tools)
3. ไปที่แท็บ **Console**
4. หา error messages (มักจะเป็น red text)

**Error ที่พบบ่อย:**
- `Failed to fetch` → API endpoint พัง
- `Network error` → Connection problem
- `Syntax error` → JavaScript error

---

### 5. ตรวจสอบ Network Tab

**ดู API Requests:**

1. เปิด Developer Tools > **Network** tab
2. Refresh หน้า `/admin/login`
3. หา requests ที่เป็น **500 Error** หรือ **Failed**

**API endpoints ที่ควรทำงาน:**
- `/api/auth/session` → ควรเป็น 200 OK
- `/api/articles` → ควรเป็น 200 OK (ถ้าใช้)
- `/api/locations` → ควรเป็น 200 OK (ถ้าใช้)

---

## 📋 Checklist

- [ ] ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
- [ ] เปลี่ยนเป็น Neon Postgres connection string (ถ้ายังไม่ใช่)
- [ ] ตรวจสอบ `NEXTAUTH_URL` บน Vercel Dashboard
- [ ] เปลี่ยนเป็น `https://wse-website.vercel.app` (ถ้ายังไม่ใช่)
- [ ] **Redeploy** (สำคัญ!)
- [ ] ตรวจสอบ Vercel Logs (หาจาก deployment ล่าสุด)
- [ ] ตรวจสอบ Browser Console (F12 > Console)
- [ ] ตรวจสอบ Network Tab (F12 > Network)

---

## 🎯 สรุป

**ปัญหาหลัก:** `DATABASE_URL` บน Vercel ยังเป็น MySQL → ต้องเปลี่ยนเป็น Neon Postgres และ **Redeploy**

**ขั้นตอน:**
1. เปลี่ยน `DATABASE_URL` และ `NEXTAUTH_URL` บน Vercel Dashboard
2. **Redeploy** (สำคัญ!)
3. ตรวจสอบ Logs และ Console

---

**ทำตามขั้นตอนนี้แล้วบอกผลลัพธ์!** 🔧
