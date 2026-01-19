# ✅ Final Setup Checklist

## ✅ เสร็จแล้ว

- [x] `DATABASE_URL` ใน `.env.local` เป็น Neon Postgres แล้ว
- [x] `schema.prisma` เป็น `postgresql` แล้ว
- [x] Prisma Client generated แล้ว
- [x] Database schema pushed แล้ว
- [x] Admin user สร้างแล้ว

---

## ⚠️ ต้องตรวจสอบบน Vercel Dashboard

### 1. DATABASE_URL

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. **Settings** > **Environment Variables**
3. ตรวจสอบ `DATABASE_URL` ควรเป็น:
   ```
   postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
   ```
4. ถ้ายังไม่ใช่ → แก้ไข → Save

### 2. NEXTAUTH_URL (สำคัญ!)

1. หา `NEXTAUTH_URL` ใน Environment Variables
2. ตรวจสอบว่าควรเป็น:
   ```
   https://wse-website.vercel.app
   ```
   (ไม่ใช่ `https://wse.vercel.app`)
3. ถ้ายังไม่ใช่ → แก้ไข → Save

---

## 🚀 Redeploy

**หลังจากแก้ไข Environment Variables แล้ว ต้อง Redeploy!**

### วิธีที่ 1: ผ่าน Vercel Dashboard (ง่ายที่สุด)

1. ไปที่ **Deployments**
2. คลิก **...** (menu) บน deployment ล่าสุด
3. เลือก **Redeploy**
4. หรือคลิก **Redeploy** ปุ่มที่เห็น

### วิธีที่ 2: ผ่าน Git Push

```powershell
git add .
git commit -m "Fix: Update DATABASE_URL and NEXTAUTH_URL"
git push
```

---

## ✅ ทดสอบหลัง Redeploy

### 1. ทดสอบ API Endpoints

- [ ] https://wse-website.vercel.app/api/articles
- [ ] https://wse-website.vercel.app/api/locations
- [ ] https://wse-website.vercel.app/api/tracking-tags

**ควรเป็น 200 OK (ไม่ใช่ 500 Error)**

### 2. ทดสอบ Admin Login

1. ไปที่ https://wse-website.vercel.app/admin/login
2. Login ด้วย:
   - **Email:** `admin@wse.com`
   - **Password:** `Password123`
3. ควรเข้า Admin Dashboard ได้

---

## 📋 Admin Credentials

```
Email: admin@wse.com
Password: Password123
Role: SUPER_ADMIN
```

---

## 🎉 เสร็จแล้ว!

หลัง Redeploy แล้ว ทุกอย่างควรใช้งานได้ปกติ!

---

**ตรวจสอบให้ครบทุกข้อ แล้ว Redeploy!** ✅
