# 🔧 แก้ไข 401 Unauthorized - สุดท้าย

## ❌ ปัญหา

ยังได้ **401 Unauthorized** จาก `/api/auth/callback/credentials`

---

## ✅ วิธีแก้ไข

### 1. ใช้ Script สร้าง User ใหม่ (แนะนำ)

Script จะ **upsert** (update หรือ create) user และแน่ใจว่าทุก field ถูกต้อง:

```powershell
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

**ตรวจสอบว่า DATABASE_URL ชี้ไป Neon:**
```powershell
Get-Content .env | Select-String -Pattern "^DATABASE_URL="
```

ควรเป็น Neon Postgres connection string

### 2. ตรวจสอบใน Neon Database Studio

**หลังรัน script แล้ว:**

1. เปิด Neon Database Studio
2. ไปที่ **User** table
3. ตรวจสอบ user `admin@wse.com`:
   - ✅ `email`: `admin@wse.com`
   - ✅ `password`: มี hash (เริ่มด้วย `$2a$12$...`)
   - ✅ `name`: `Super Admin`
   - ✅ `role`: `SUPER_ADMIN`

### 3. ตรวจสอบ Vercel Environment Variables

**ตรวจสอบบน Vercel Dashboard:**

1. **Settings** > **Environment Variables**
2. ตรวจสอบ:
   - `DATABASE_URL` - ควรเป็น Neon Postgres connection string
   - `NEXTAUTH_URL` - ควรเป็น `https://wse-website.vercel.app`
   - `NEXTAUTH_SECRET` - ควรมีค่า

### 4. ตรวจสอบ Vercel Logs

**ดู Error Logs:**

1. Vercel Dashboard > **Deployments** > เลือก deployment ล่าสุด
2. **Functions** > `/api/auth/[...nextauth]` > **Logs**
3. หา error messages (มักจะเป็น red)

**Error ที่พบบ่อย:**
- `PrismaClientInitializationError` → Database connection error
- `User not found` → Email ไม่ถูกต้อง
- `Invalid password` → Password hash ไม่ตรง

---

## 📋 Checklist

- [ ] รัน script: `npm run create-admin admin@wse.com "Password123" "Super Admin"`
- [ ] ตรวจสอบใน Neon Database Studio ว่า `name` และ `role` ถูกต้อง
- [ ] ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
- [ ] ตรวจสอบ `NEXTAUTH_URL` บน Vercel Dashboard
- [ ] ตรวจสอบ Vercel Logs (หา error message)
- [ ] Hard Refresh (Ctrl+Shift+R) แล้วทดสอบ Login อีกครั้ง

---

## 🔍 Debug Steps

### Step 1: ตรวจสอบ Database

```powershell
# Pull env
vercel env pull .env.local

# ตรวจสอบ DATABASE_URL
Get-Content .env | Select-String -Pattern "^DATABASE_URL="

# สร้าง user ใหม่
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

### Step 2: ตรวจสอบ Vercel Logs

ดู error message ที่แท้จริงจาก Vercel Logs

### Step 3: ทดสอบ Login

1. Hard Refresh (Ctrl+Shift+R)
2. ไปที่: https://wse-website.vercel.app/admin/login
3. Email: `admin@wse.com`
4. Password: `Password123`
5. คลิก "เข้าสู่ระบบ"

---

## 💡 Tips

**ถ้ายังไม่ได้:**

1. **ดู Vercel Logs ก่อน** - จะบอก error ที่แท้จริง
2. **ตรวจสอบ database** - ว่า user มี `name` และ `role` หรือไม่
3. **ลองสร้าง user ใหม่** - ด้วย password ใหม่

---

**ทำตามขั้นตอนนี้แล้วบอกผลลัพธ์!** 🔧
