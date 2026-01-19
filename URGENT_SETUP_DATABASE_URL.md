# 🚨 URGENT: ตั้งค่า DATABASE_URL บน Vercel

## ❌ ปัญหา

**Error:** `Environment variable not found: DATABASE_URL`

**สาเหตุ:** `DATABASE_URL` บน Vercel Dashboard ยังไม่มี!

---

## ✅ วิธีแก้ไข (ทำทันที!)

### 1. ไปที่ Vercel Dashboard

https://vercel.com/dashboard

### 2. ตั้งค่า Environment Variable

1. เลือก Project **wse-website**
2. **Settings** > **Environment Variables**
3. คลิก **Add New** (หรือ Edit ถ้ามี `DATABASE_URL` อยู่แล้ว)
4. ตั้งค่า:
   - **Key:** `DATABASE_URL`
   - **Value:** 
     ```
     postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
     ```
   - **Environment:** เลือก **Production**, **Preview**, และ **Development** (ทั้งหมด!)
5. คลิก **Save**

### 3. Redeploy (สำคัญ!)

**หลังจากตั้งค่า `DATABASE_URL` แล้ว ต้อง Redeploy!**

1. ไปที่ **Deployments**
2. คลิก **...** (menu) บน deployment ล่าสุด
3. เลือก **Redeploy**
4. รอให้ deploy เสร็จ (~2-3 นาที)

---

## 📋 Checklist

- [ ] ตั้งค่า `DATABASE_URL` บน Vercel Dashboard
- [ ] Environment: เลือก Production, Preview, Development (ทั้งหมด)
- [ ] Save
- [ ] **Redeploy** (สำคัญ!)
- [ ] ทดสอบ Login: https://wse-website.vercel.app/admin/login

---

## ✅ Connection String

```
postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require
```

---

**ทำทันที!** 🚨
