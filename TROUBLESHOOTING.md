# คู่มือแก้ปัญหา (Troubleshooting Guide)

## ปัญหาที่พบบ่อยและวิธีแก้ไข

### 1. Error: "Failed to fetch articles" หรือ "Failed to fetch locations"

**สาเหตุ:**
- Database ไม่ได้เชื่อมต่อ
- Prisma Client ยังไม่ได้ generate
- Schema ไม่ตรงกับ database

**วิธีแก้:**
```bash
# 1. ตรวจสอบ DATABASE_URL ใน .env
DATABASE_URL="mysql://username:password@localhost:3306/wse_db"

# 2. Generate Prisma Client
npx prisma generate

# 3. Push schema ไปยัง database
npx prisma db push

# 4. ตรวจสอบการเชื่อมต่อ database
npx prisma studio
```

### 2. Error: "Unauthorized" ใน API calls

**สาเหตุ:**
- API endpoint ต้องการ authentication แต่หน้าเว็บปกติไม่ใช่ authenticated user

**วิธีแก้:**
- API endpoints ที่ใช้ในหน้าเว็บ (GET /api/articles, /api/locations) ไม่ต้องการ authentication
- ถ้ายัง error อาจเป็นเพราะ Prisma error ที่ซ่อนอยู่

### 3. Error: "Article not found" หรือ "Location not found"

**สาเหตุ:**
- ยังไม่มีข้อมูลใน database

**วิธีแก้:**
```bash
# สร้างข้อมูลทดสอบผ่าน Admin Panel
1. เข้าสู่ระบบ Admin: http://localhost:3000/admin/login
2. ไปที่ Location Management > + เพิ่มสาขา
3. ไปที่ Content Management > บทความ > + เขียนบทความใหม่
   - เปลี่ยนสถานะเป็น PUBLISHED
```

### 4. Error: "Failed to upload file" หรือรูปภาพไม่แสดง

**สาเหตุ:**
- โฟลเดอร์ `/public/uploads/` ยังไม่มี
- Permission ในการเขียนไฟล์

**วิธีแก้:**
```bash
# สร้างโฟลเดอร์ uploads
mkdir -p public/uploads

# หรือระบบจะสร้างอัตโนมัติเมื่ออัพโหลดครั้งแรก
```

### 5. Error: "Module not found" หรือ "Cannot find module"

**สาเหตุ:**
- Dependencies ยังไม่ได้ติดตั้ง

**วิธีแก้:**
```bash
npm install
```

### 6. Error: "Prisma Client initialization"

**สาเหตุ:**
- Prisma Client ยังไม่ได้ generate

**วิธีแก้:**
```bash
npx prisma generate
npm run dev
```

### 7. Lead Form ไม่ส่งข้อมูล

**สาเหตุ:**
- สาขาใน database ไม่ตรงกับชื่อในฟอร์ม
- API error แต่ไม่ได้แสดง

**วิธีแก้:**
1. ตรวจสอบ Console ใน Browser (F12 > Console)
2. ตรวจสอบว่ามีสาขาใน database หรือไม่
3. ไปที่ Admin > Location Management เพื่อเพิ่มสาขา

### 8. Admin Panel ไม่แสดงข้อมูล

**สาเหตุ:**
- ยังไม่ได้ login
- Session expired

**วิธีแก้:**
1. ไปที่ `/admin/login`
2. Login ใหม่
3. ตรวจสอบว่า session ยัง active หรือไม่

### 9. Blog page แสดง "ยังไม่มีบทความ"

**สาเหตุ:**
- ยังไม่มีบทความที่ PUBLISHED

**วิธีแก้:**
1. ไปที่ Admin > Content Management > บทความ
2. สร้างบทความใหม่
3. เปลี่ยนสถานะเป็น **PUBLISHED** (สำคัญ!)
4. บันทึก

### 10. Error: Database connection timeout

**สาเหตุ:**
- MySQL server ไม่ได้รัน
- DATABASE_URL ไม่ถูกต้อง
- Firewall block port

**วิธีแก้:**
```bash
# ตรวจสอบ MySQL service
# Windows: ตรวจสอบ Services
# Mac/Linux: sudo service mysql status

# ตรวจสอบ DATABASE_URL
# ต้องเป็น: mysql://username:password@localhost:3306/database_name
```

## การตรวจสอบ Errors

### Frontend Errors
1. เปิด Browser Console (F12)
2. ดู Error Messages
3. ตรวจสอบ Network tab สำหรับ API calls ที่ล้มเหลว

### Backend Errors
1. ดู Terminal ที่รัน `npm run dev`
2. ดู Error logs
3. ตรวจสอบ Prisma errors

### Database Errors
```bash
# เปิด Prisma Studio เพื่อดูข้อมูล
npx prisma studio

# ตรวจสอบ schema
npx prisma validate
```

## ตรวจสอบระบบ

### ตรวจสอบว่าทุกอย่างทำงาน:
```bash
# 1. Dependencies
npm install

# 2. Prisma
npx prisma generate
npx prisma db push

# 3. สร้าง Admin user
npm run create-admin admin@wse.com admin123 "Admin"

# 4. รัน dev server
npm run dev
```

### ตรวจสอบ API Endpoints:
- ✅ GET `/api/articles?status=PUBLISHED` - ต้องไม่ error
- ✅ GET `/api/locations` - ต้องไม่ error  
- ✅ GET `/api/articles/by-slug/[slug]` - ต้องไม่ error
- ✅ POST `/api/leads` - ต้องไม่ error

## สิ่งที่ต้องตรวจสอบก่อนใช้งาน

1. ✅ Database เชื่อมต่อได้
2. ✅ Prisma Client generated
3. ✅ มี Admin user อย่างน้อย 1 คน
4. ✅ มีสาขา (Location) อย่างน้อย 1 แห่ง (สำหรับ Lead Form)
5. ✅ Uploads folder พร้อมใช้งาน

## ถ้ายังแก้ไม่ได้

1. ตรวจสอบ `.env` file
2. ตรวจสอบ Prisma schema ตรงกับ database
3. ลอง restart dev server
4. ลบ `.next` folder และ rebuild: `rm -rf .next && npm run dev`
