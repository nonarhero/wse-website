# ✅ Deployment Checklist

ใช้ checklist นี้เพื่อตรวจสอบก่อน deploy ให้ลูกค้า

## 📋 Pre-Deployment Checklist

### Environment Setup
- [ ] สร้างไฟล์ `.env.local` หรือตั้งค่า Environment Variables
- [ ] `DATABASE_URL` ถูกต้องและทดสอบเชื่อมต่อได้
- [ ] `NEXTAUTH_URL` ตั้งเป็น production URL (https://your-domain.com)
- [ ] `NEXTAUTH_SECRET` สุ่มและมีความยาวอย่างน้อย 32 characters
- [ ] `THAIBULKSMS_API_KEY` และ `SECRET` ถูกต้อง (ถ้าใช้)
- [ ] `NODE_ENV=production`

### Database
- [ ] Database สร้างแล้วและพร้อมใช้งาน
- [ ] Database user มีสิทธิ์เข้าถึง database
- [ ] รัน `npm run db:generate` สำเร็จ
- [ ] รัน `npm run db:push` สำเร็จ
- [ ] สร้าง Admin user แล้ว (`npm run create-admin`)

### Code & Build
- [ ] `npm install` สำเร็จ
- [ ] `npm run build` สำเร็จไม่มี error
- [ ] ทดสอบ `npm start` ทำงานได้
- [ ] ไม่มี console errors ใน production build

### File Upload
- [ ] โฟลเดอร์ `public/uploads` มีอยู่
- [ ] มีสิทธิ์เขียนไฟล์ (`chmod 755` สำหรับ Linux)
- [ ] ทดสอบอัพโหลดรูปภาพได้

### Security
- [ ] ไม่ commit `.env` หรือ `.env.local` ขึ้น Git
- [ ] `.gitignore` มี `.env*` แล้ว
- [ ] Admin password แข็งแรง
- [ ] Database password แข็งแรง

---

## 🧪 Post-Deployment Testing

### Frontend
- [ ] หน้าแรก (`/`) แสดงได้
- [ ] Hero section แสดง
- [ ] บทความล่าสุดแสดง (ถ้ามี)
- [ ] หน้า Blog (`/blog`) แสดงได้
- [ ] หน้ารายละเอียดบทความ (`/blog/[slug]`) แสดงได้
- [ ] Lead Form (`#register`) ทำงานและส่งข้อมูลได้
- [ ] CEFR Test (`/test-your-english/cefr`) ทำงาน

### Admin Dashboard
- [ ] Login (`/admin/login`) ทำงาน
- [ ] เข้า Admin Dashboard (`/admin`) ได้
- [ ] สร้าง/แก้ไข/ลบบทความได้
- [ ] อัพโหลดรูปภาพได้
- [ ] จัดการหมวดหมู่และ Tags ได้
- [ ] ดู Leads ได้
- [ ] เปลี่ยนสถานะ Leads ได้
- [ ] ตั้งค่า Settings ได้
- [ ] เปิด/ปิด OTP ได้

### API
- [ ] `/api/articles` ทำงาน
- [ ] `/api/locations` ทำงาน
- [ ] `/api/courses` ทำงาน
- [ ] `/api/leads` ทำงาน (POST)
- [ ] `/api/cefr-test/submit` ทำงาน

### OTP/SMS (ถ้าใช้)
- [ ] ส่ง OTP ได้
- [ ] ยืนยัน OTP ได้

---

## 📝 Handoff Information

หลังจาก deploy เสร็จ แจ้งข้อมูลต่อไปนี้ให้ลูกค้า:

### Login Credentials
```
Admin URL: https://your-domain.com/admin/login
Email: admin@wse.com
Password: [ตั้งไว้เป็นอะไร]
```

### Important URLs
```
Homepage: https://your-domain.com
Blog: https://your-domain.com/blog
CEFR Test: https://your-domain.com/test-your-english/cefr
Admin: https://your-domain.com/admin
```

### Next Steps
1. เปลี่ยน Admin password หลังจาก login ครั้งแรก
2. สร้างบทความทดสอบเพื่อตรวจสอบระบบ
3. ตั้งค่า System Settings (OTP, SMTP, SMS)
4. เพิ่ม Locations และ Courses

---

## 🔄 Update Process

เมื่อต้องการ update โปรเจกต์ในอนาคต:

### Vercel
```bash
git pull origin main
vercel --prod
```

### VPS
```bash
git pull origin main
npm install --production
npm run build
pm2 restart wse-website
```

### Database Updates (ถ้ามี)
```bash
npm run db:generate
npm run db:push
```

---

## 📞 Support Contacts

ถ้ามีปัญหาติดต่อ:
- ตรวจสอบ logs ก่อน
- ตรวจสอบ environment variables
- ตรวจสอบ database connection
