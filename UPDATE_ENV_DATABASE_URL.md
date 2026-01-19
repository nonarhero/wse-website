# 🔧 วิธีแก้ไข DATABASE_URL ใน .env file

## ❌ ปัญหา

`.env` file ยังมี `DATABASE_URL` เป็น MySQL:
```
DATABASE_URL="mysql://root:bsn_industry2521@host:3306/wse"
```

## ✅ วิธีแก้ไข (ทำเอง)

### 1. เปิดไฟล์ `.env` ด้วย Text Editor

### 2. หาบรรทัด `DATABASE_URL`

### 3. เปลี่ยนจาก:
```env
DATABASE_URL="mysql://root:bsn_industry2521@host:3306/wse"
```

### 4. เป็น:
```env
DATABASE_URL="postgresql://neondb_owner:npg_Xakdlb0C5vhy@ep-lucky-voice-a1shp8ch-pooler.ap-southeast-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require"
```

### 5. บันทึกไฟล์ (Save)

---

## 🚀 หลังจากแก้ไขแล้ว

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# สร้าง Admin User
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

---

**เสร็จแล้ว!** 🎉
