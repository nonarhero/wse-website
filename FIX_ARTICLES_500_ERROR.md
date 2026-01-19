# 🔧 แก้ไข /api/articles POST 500 Error

## ❌ ปัญหา

- `/api/articles` POST → 500 Error
- ฟอร์มเนื้อหาไม่แสดง (ไม่เหมือนตอน dev)

---

## ✅ แก้ไขแล้ว

1. **API Route** - รองรับทั้ง `tags` และ `tagIds` แล้ว
2. **Error Logging** - เพิ่ม error details แล้ว

---

## 🔍 ตรวจสอบ Vercel Logs

**ดู Error Logs:**

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. คลิก **Deployments** > เลือก deployment ล่าสุด
3. คลิก **Functions** > `/api/articles` > **Logs**
4. หา error messages (มักจะเป็น red)

**Error ที่พบบ่อย:**
- `PrismaClientInitializationError` → Database connection error
- `Invalid input` → Data validation error
- `Foreign key constraint` → Category หรือ Tag ไม่มีใน database

---

## 📋 Checklist

- [x] แก้ไข API route ให้รองรับ `tagIds` แล้ว
- [ ] ตรวจสอบ Vercel Logs (หา error message)
- [ ] Commit และ push code
- [ ] Redeploy (ถ้าจำเป็น)
- [ ] ทดสอบสร้างบทความอีกครั้ง

---

## 💡 เกี่ยวกับฟอร์มเนื้อหา

**ฟอร์มใช้ textarea ธรรมดา** (ไม่ใช่ rich text editor)

ถ้าไม่เห็นฟอร์ม:
1. ตรวจสอบ Browser Console (F12 > Console) - หา JavaScript errors
2. ตรวจสอบ Network Tab - ดู API calls ที่ fail
3. Hard Refresh (Ctrl+Shift+R)

---

## 🚀 Commit และ Push

```powershell
git add app/api/articles/route.ts
git commit -m "Fix: Improve error handling and support tagIds in articles API"
git push
```

---

**บอก error message จาก Vercel Logs มาด้วย จะช่วยแก้ไขได้เร็วขึ้น!** 🔍
