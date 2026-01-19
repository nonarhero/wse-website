# 🔧 แก้ไข Image Upload บน Vercel

## ❌ ปัญหา

**อัพรูปไม่ได้** - บน Vercel ไม่สามารถเขียนไฟล์ลง local file system ได้ (serverless, read-only)

---

## ✅ วิธีแก้ไข

### 1. สร้าง Vercel Blob Storage

1. ไปที่ **Vercel Dashboard** > Project `wse-website`
2. คลิกแท็บ **Storage**
3. คลิก **Create Database**
4. เลือก **Blob** (Vercel Native Storage)
5. ตั้งชื่อ: `wse-blob` (หรือชื่ออะไรก็ได้)
6. คลิก **Create**
7. **Copy BLOB_READ_WRITE_TOKEN** (จะมีให้อัตโนมัติ)

### 2. ตั้งค่า Environment Variable

1. ไปที่ **Settings** > **Environment Variables**
2. คลิก **Add New**
3. **Key:** `BLOB_READ_WRITE_TOKEN`
4. **Value:** วาง **BLOB_READ_WRITE_TOKEN** ที่ copy มา
5. **Environment:** เลือก **Production**, **Preview**, และ **Development** (ทั้งหมด!)
6. คลิก **Save**

### 3. Commit และ Push Code

```powershell
git add .
git commit -m "Fix: Use Vercel Blob Storage for image uploads"
git push
```

### 4. Redeploy

**หลังจากตั้งค่า Environment Variable แล้ว ต้อง Redeploy!**

- Vercel Dashboard > Deployments > ... > Redeploy

---

## 📋 Checklist

- [ ] สร้าง Vercel Blob Storage
- [ ] Copy BLOB_READ_WRITE_TOKEN
- [ ] ตั้งค่า `BLOB_READ_WRITE_TOKEN` บน Vercel Dashboard
- [ ] Environment: เลือก Production, Preview, Development (ทั้งหมด)
- [ ] Save
- [ ] Commit และ push code
- [ ] **Redeploy** (สำคัญ!)
- [ ] ทดสอบอัพรูป

---

## ✅ หลัง Redeploy แล้ว

ลองอัพรูปอีกครั้ง - ควรทำงานได้แล้ว! 🎉

---

**ทำตามขั้นตอนนี้แล้วบอกผลลัพธ์!** 🔧
