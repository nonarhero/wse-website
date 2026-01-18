# Wall Street English - Admin Dashboard

## การติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. สร้างไฟล์ `.env`:
```env
DATABASE_URL="mysql://user:password@localhost:3306/wse_db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
THAIBULKSMS_API_KEY="your-api-key"
THAIBULKSMS_API_SECRET="your-api-secret"
```

3. Setup Prisma:
```bash
npx prisma generate
npx prisma db push
```

4. สร้าง Super Admin user:
```bash
npx ts-node scripts/create-admin.ts
```

## Features

### ✅ ที่สร้างเสร็จแล้ว:
- Prisma Schema พร้อม Relations
- Authentication System (NextAuth)
- Role-based Access Control
- Admin Dashboard Layout
- Course Management
- Lead Management
- API Routes สำหรับ CRUD

### 🔄 กำลังพัฒนา:
- Location Management
- Article Management (WordPress-like)
- CEFR Test System + OTP
- Banner Management
- E-Book Management
- Tracking Tags
- System Settings
- Reports

## API Endpoints

### Courses
- `GET /api/courses` - ดึงรายการคอร์ส
- `POST /api/courses` - สร้างคอร์สใหม่
- `PUT /api/courses/[id]` - อัพเดทคอร์ส
- `DELETE /api/courses/[id]` - ลบคอร์ส

### Leads
- `GET /api/leads` - ดึงรายการ Leads
- `POST /api/leads` - สร้าง Lead ใหม่ (จากฟอร์มหน้าเว็บ)
- `PUT /api/leads/[id]` - อัพเดท Lead

### CEFR Test
- `POST /api/cefr-test/otp` - ส่ง OTP
- `POST /api/cefr-test/submit` - ส่งคำตอบทดสอบ

## User Roles

- `SUPER_ADMIN` - สิทธิ์เต็ม
- `ADMIN` - จัดการเนื้อหา
- `WRITER` - เขียนบทความ
- `REVIEWER` - ตรวจสอบบทความ

## Thaibulksms Integration

ระบบเชื่อมต่อกับ Thaibulksms API สำหรับส่ง OTP และ SMS แจ้งเตือน

## หมายเหตุ

- ต้องมี MySQL database
- ต้องมี Thaibulksms account สำหรับส่ง SMS
- ต้องตั้งค่า SMTP สำหรับส่งอีเมล
