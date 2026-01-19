# 🔧 แก้ไข Missing User Fields (name, role)

## ❌ ปัญหา

User `admin@wse.com` ใน Neon Database:
- ✅ `email`: `admin@wse.com`
- ✅ `password`: มี hash แล้ว
- ❌ `name`: **ว่าง!**
- ❌ `role`: **ว่าง!**

**สาเหตุ:** `authOptions.ts` return `null` เมื่อ `user.role` เป็น null → 401 Unauthorized

---

## ✅ วิธีแก้ไข

### วิธีที่ 1: แก้ไขใน Neon Database Studio (แนะนำ - เร็วที่สุด)

1. **ใน Neon Database Studio** (ที่เปิดอยู่):
   - คลิกที่ row ของ `admin@wse.com`
   - แก้ไข `name` field: ใส่ `Super Admin`
   - แก้ไข `role` field: เลือก `SUPER_ADMIN` (จาก dropdown)
   - คลิก **Save** (Ctrl+Enter)

2. **ทดสอบ Login:**
   - ไปที่: https://wse-website.vercel.app/admin/login
   - Email: `admin@wse.com`
   - Password: `Password123`
   - คลิก "เข้าสู่ระบบ"
   - ควรเข้าได้! ✅

### วิธีที่ 2: ใช้ Script สร้าง User ใหม่

```powershell
# สร้าง user ใหม่ (script จะ upsert - update หรือ create)
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

**ตรวจสอบว่า DATABASE_URL ชี้ไป Neon:**
```powershell
# ตรวจสอบ .env file
Get-Content .env | Select-String -Pattern "^DATABASE_URL="
```

---

## 📋 Checklist

- [ ] แก้ไข `name` ใน Neon Database Studio → `Super Admin`
- [ ] แก้ไข `role` ใน Neon Database Studio → `SUPER_ADMIN`
- [ ] Save (Ctrl+Enter)
- [ ] ทดสอบ Login อีกครั้ง

---

## ✅ หลังแก้ไข

User record ควรเป็น:
- `email`: `admin@wse.com`
- `password`: `$2a$12$...` (hash)
- `name`: `Super Admin` ✅
- `role`: `SUPER_ADMIN` ✅

**แล้ว Login ควรทำงานได้!** 🎉

---

**แก้ไขใน Neon Database Studio ตอนนี้เลย!** 🔧
