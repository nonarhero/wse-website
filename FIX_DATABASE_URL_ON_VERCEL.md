# 🚨 แก้ไข DATABASE_URL บน Vercel - URGENT

## ❌ ปัญหา

**Error:** `Environment variable not found: DATABASE_URL`

**สาเหตุ:** `DATABASE_URL` บน Vercel Dashboard ยังไม่มีหรือไม่ถูกต้อง!

---

## ✅ วิธีแก้ไข (ทำทันที!)

### 1. ตรวจสอบและตั้งค่า DATABASE_URL บน Vercel Dashboard

**ขั้นตอน:**

1. ไปที่ **Vercel Dashboard**: https://vercel.com/dashboard
2. เลือก Project **wse-website**
3. ไปที่ **Settings** > **Environment Variables**
4. หา `DATABASE_URL`:
   - **ถ้ามีอยู่แล้ว** → คลิก **Edit**
   - **ถ้ายังไม่มี** → คลิก **Add New**

5. ตั้งค่าดังนี้:
   - **Key:** `DATABASE_URL`
   - **Value:** 
     ```
     postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
     ```
   - **Environment:** เลือก **Production**, **Preview**, และ **Development** (ทั้งหมด!)

6. คลิก **Save**

### 2. Commit และ Push schema.prisma (ถ้ายังไม่ได้)

**ตรวจสอบว่า schema.prisma เป็น postgresql:**

```powershell
Get-Content prisma/schema.prisma | Select-String -Pattern "provider"
```

**ควรเป็น:**
```
provider = "postgresql"
```

**ถ้ายังเป็น `mysql` → แก้ไข:**
```powershell
# แก้ไขเป็น postgresql (ถ้ายังไม่ได้)
```

**Commit และ Push:**
```powershell
git add prisma/schema.prisma
git commit -m "Fix: Update schema to postgresql"
git push
```

### 3. Redeploy (สำคัญ!)

**หลังจากตั้งค่า `DATABASE_URL` แล้ว ต้อง Redeploy!**

#### วิธีที่ 1: ผ่าน Vercel Dashboard (ง่ายที่สุด)

1. ไปที่ **Deployments**
2. คลิก **...** (menu) บน deployment ล่าสุด
3. เลือก **Redeploy**
4. รอให้ deploy เสร็จ (~2-3 นาที)

#### วิธีที่ 2: ผ่าน Git Push

```powershell
git commit --allow-empty -m "Trigger redeploy after DATABASE_URL update"
git push
```

---

## 📋 Checklist

- [ ] ตรวจสอบ `DATABASE_URL` บน Vercel Dashboard
- [ ] ตั้งค่า `DATABASE_URL` เป็น Neon Postgres connection string
- [ ] Environment: เลือก Production, Preview, Development (ทั้งหมด)
- [ ] Save
- [ ] ตรวจสอบ `schema.prisma` เป็น `postgresql` (ไม่ใช่ `mysql`)
- [ ] Commit และ push `schema.prisma` (ถ้ายังไม่ได้)
- [ ] **Redeploy** (สำคัญ!)
- [ ] ทดสอบ Login อีกครั้ง

---

## 🔍 Connection String ที่ใช้

```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

หรือใช้ (ไม่มี connect_timeout):
```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

---

## ⚠️ สำคัญ

**หลังตั้งค่า `DATABASE_URL` แล้ว ต้อง Redeploy!**

Environment Variables ไม่มีผลทันที - ต้อง deploy ใหม่เพื่อให้ค่าใหม่ถูกใช้

---

## ✅ หลัง Redeploy แล้ว

ลองทดสอบ Login:
1. Hard Refresh (Ctrl+Shift+R)
2. ไปที่: https://wse-website.vercel.app/admin/login
3. Email: `admin@wse.com`
4. Password: `Password123`
5. คลิก "เข้าสู่ระบบ"

**ควรเข้าได้แล้ว!** 🎉

---

**ทำทันที!** 🚨
