# 🚨 แก้ไข URGENT: DATABASE_URL บน Vercel

## ❌ ปัญหา

**ทุก API endpoint ที่ใช้ Prisma พังหมด!**

Error: `Can't reach database server at 'host:3306'`

**สาเหตุ:** `DATABASE_URL` บน Vercel ยังเป็น MySQL ที่ไม่ถูกต้อง (`mysql://...@host:3306/wse`)

---

## ✅ วิธีแก้ไข (ทำทันที!)

### 1. เปลี่ยน DATABASE_URL บน Vercel Dashboard

1. ไปที่ **Vercel Dashboard**: https://vercel.com/dashboard
2. เลือก Project **wse-website**
3. ไปที่ **Settings** > **Environment Variables**
4. หา `DATABASE_URL` และคลิก **Edit** (หรือ **Add** ถ้ายังไม่มี)
5. **Key:** `DATABASE_URL`
6. **Value:** เปลี่ยนเป็น Neon Postgres connection string:
   ```
   postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
   ```
7. **Environment:** เลือก **Production**, **Preview**, และ **Development** (ทั้งหมด)
8. คลิก **Save**

### 2. Redeploy (สำคัญ!)

หลังจากแก้ไข `DATABASE_URL` แล้ว ต้อง **Redeploy**:

**วิธีที่ 1: ผ่าน Vercel Dashboard (ง่ายที่สุด)**
1. ไปที่ **Deployments**
2. คลิก **...** (menu) บน deployment ล่าสุด
3. เลือก **Redeploy**
4. หรือคลิก **Redeploy** ปุ่มที่เห็น

**วิธีที่ 2: ผ่าน Git Push**
```powershell
git add .
git commit -m "Fix: Update DATABASE_URL to Neon Postgres"
git push
```

---

## 📋 Checklist

- [ ] เปลี่ยน `DATABASE_URL` บน Vercel Dashboard
- [ ] ตรวจสอบว่าเปลี่ยนเป็น Postgres connection string แล้ว
- [ ] Save Environment Variable
- [ ] Redeploy (ผ่าน Dashboard หรือ Git push)
- [ ] ทดสอบ API endpoints:
  - [ ] https://wse-website.vercel.app/api/articles
  - [ ] https://wse-website.vercel.app/api/locations
  - [ ] https://wse-website.vercel.app/api/tracking-tags

---

## 🔍 Connection String ที่ใช้

ใช้ `wse_POSTGRES_PRISMA_URL` ที่ Vercel generate ให้:

```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

หรือใช้ `wse_DATABASE_URL`:

```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
```

---

## ⚠️ สิ่งสำคัญ

**หลังจากเปลี่ยน `DATABASE_URL` แล้ว ต้อง Redeploy!**

Environment Variables ไม่มีผลทันที - ต้อง Redeploy เพื่อให้ค่าที่เปลี่ยนไปใช้กับ deployment ใหม่

---

## ✅ หลัง Redeploy แล้ว

ลองทดสอบ:
- https://wse-website.vercel.app/api/articles
- https://wse-website.vercel.app/api/locations
- https://wse-website.vercel.app/api/tracking-tags

ถ้าไม่ error แล้ว = สำเร็จ! 🎉

---

**ทำทันที!** 🚨
