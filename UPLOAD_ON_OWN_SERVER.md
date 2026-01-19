# 🖥️ อัปโหลดรูปภาพบน Server เอง

## ✅ ข้อดีของการใช้ Server เอง

- ✅ **ควบคุมได้เต็มที่** - จัดการ storage เอง
- ✅ **ไม่มีค่าใช้จ่ายเพิ่ม** - ไม่ต้องจ่าย Blob Storage
- ✅ **เขียนไฟล์ได้** - บน VPS/server สามารถเขียนไฟล์ลง file system ได้
- ✅ **Backup ง่าย** - backup folder `public/uploads` ได้เลย

---

## ❌ ข้อเสีย

- ❌ **ต้องจัดการเอง** - backup, storage space, permissions
- ❌ **ไม่ทำงานบน Vercel** - Vercel เป็น serverless (read-only file system)

---

## 🔧 วิธี Setup บน Server เอง

### 1. สร้างโฟลเดอร์ uploads

```bash
mkdir -p public/uploads
chmod 755 public/uploads
```

### 2. ตั้งค่า Permissions

```bash
# ให้ web server เขียนไฟล์ได้
chown -R www-data:www-data public/uploads  # สำหรับ Apache/Nginx
# หรือ
chmod -R 755 public/uploads
```

### 3. ตรวจสอบ API Route

API route (`app/api/upload/route.ts`) จะ:
- รับไฟล์
- บันทึกลง `public/uploads/`
- Return URL: `/uploads/filename.jpg`

### 4. ตั้งค่า Next.js Static Files

**ตรวจสอบ `next.config.js` (ถ้ามี):**

```js
module.exports = {
  // Next.js จะ serve static files จาก public/ อัตโนมัติ
  // ไม่ต้องตั้งค่าอะไรเพิ่ม
}
```

---

## 📋 Checklist สำหรับ Server เอง

- [ ] สร้างโฟลเดอร์ `public/uploads`
- [ ] ตั้งค่า permissions (755 หรือ 775)
- [ ] ตรวจสอบว่า web server (Nginx/Apache) สามารถเขียนไฟล์ได้
- [ ] ทดสอบอัปโหลดรูป
- [ ] ตั้งค่า backup สำหรับ `public/uploads`

---

## 🚀 Deploy บน VPS/Server

### 1. Clone Project

```bash
git clone https://github.com/nonarhero/wse-website.git
cd wse-website
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

สร้างไฟล์ `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/wse"
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-secret-key"
```

### 4. Setup Database

```bash
npx prisma generate
npx prisma db push
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

### 5. Build และ Start

```bash
npm run build
npm start
```

### 6. ตั้งค่า Nginx/Apache (ถ้าต้องการ)

**Nginx example:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Serve static uploads
    location /uploads {
        alias /path/to/wse-website/public/uploads;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 💡 Tips

**Backup uploads folder:**

```bash
# Backup ทุกวัน
tar -czf uploads-backup-$(date +%Y%m%d).tar.gz public/uploads/
```

**Monitor storage:**

```bash
# ตรวจสอบขนาด folder
du -sh public/uploads/
```

---

## ⚠️ หมายเหตุ

**บน Vercel:**
- API upload จะ return error: "File upload not supported on serverless"
- ใช้ **URL รูปภาพโดยตรง** แทน (ใส่ในช่อง "หรือใส่ URL รูปภาพโดยตรง")

**บน Server เอง:**
- API upload ทำงานได้ปกติ
- ไฟล์จะถูกบันทึกลง `public/uploads/`

---

**ใช้ Server เองดีกว่า - ควบคุมได้เต็มที่!** 🖥️
