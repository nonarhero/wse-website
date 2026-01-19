# 🔍 Debug 401 Unauthorized Error

## ❌ ปัญหา

Login ไม่ผ่าน - ได้ **401 Unauthorized**

---

## 🔍 วิธี Debug

### 1. ตรวจสอบ Vercel Logs

**ดู Error Logs:**

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. คลิก **Deployments** > เลือก deployment ล่าสุด
3. คลิก **Functions** > `/api/auth/[...nextauth]` > **Logs**
4. หรือดู **Runtime Logs** - หา error messages

**Error ที่พบบ่อย:**
- `PrismaClientInitializationError` → Database connection error
- `User not found` → Email ไม่ถูกต้อง
- `Invalid password` → Password ไม่ถูกต้อง

### 2. ตรวจสอบว่า User ถูกสร้างใน Database จริงหรือไม่

**ใช้ Prisma Studio:**

```powershell
# Pull env ใหม่
vercel env pull .env.local

# ตรวจสอบว่า DATABASE_URL ถูกต้อง
# (อาจต้องใช้ .env file แทน .env.local)

# เปิด Prisma Studio
npx prisma studio
```

**ตรวจสอบใน Prisma Studio:**
- ไปที่ **User** table
- หา `admin@wse.com`
- ตรวจสอบว่ามี user นี้อยู่จริง
- ตรวจสอบ `role` ว่าเป็น `SUPER_ADMIN`

### 3. ทดสอบ Password Hash

**สร้าง user ใหม่ด้วย script:**

```powershell
# Pull env
vercel env pull .env.local

# ตรวจสอบว่าใช้ DATABASE_URL จาก .env หรือ .env.local
# (script อาจใช้ .env file)

# สร้าง user ใหม่
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

---

## ✅ วิธีแก้ไข

### Option 1: สร้าง User ใหม่ด้วย Password ใหม่

```powershell
# สร้าง user ใหม่
npm run create-admin admin@wse.com "NewPassword123" "Super Admin"
```

แล้วใช้ `NewPassword123` login

### Option 2: ตรวจสอบ Database Connection

**ตรวจสอบว่า `DATABASE_URL` บน Vercel ถูกต้อง:**

1. Vercel Dashboard > Settings > Environment Variables
2. ตรวจสอบ `DATABASE_URL` ควรเป็น Neon Postgres connection string
3. ถ้ายังไม่ใช่ → แก้ไข → Save → Redeploy

### Option 3: ตรวจสอบ Environment Variables

**ตรวจสอบบน Vercel:**

- `DATABASE_URL` - ควรเป็น Neon Postgres
- `NEXTAUTH_URL` - ควรเป็น `https://wse-website.vercel.app`
- `NEXTAUTH_SECRET` - ควรมีค่า

---

## 🔍 Checklist

- [ ] ตรวจสอบ Vercel Logs (หา error message)
- [ ] ตรวจสอบว่ามี user `admin@wse.com` ใน database หรือไม่
- [ ] ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
- [ ] ลองสร้าง user ใหม่ด้วย password ใหม่
- [ ] ทดสอบ login อีกครั้ง

---

## 💡 Tips

**ถ้ายังไม่ได้:**

1. ดู Vercel Logs ก่อน - จะบอก error ที่แท้จริง
2. ตรวจสอบ database ว่า user ถูกสร้างหรือไม่
3. ลองสร้าง user ใหม่ด้วย password ใหม่

---

**บอก error message จาก Vercel Logs มาด้วย จะช่วยแก้ไขได้เร็วขึ้น!** 🔍
