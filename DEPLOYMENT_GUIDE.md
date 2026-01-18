# 🚀 คู่มือการ Deploy สำหรับลูกค้า Test

## 📋 สารบัญ
1. [การเตรียมพร้อมก่อน Deploy](#1-การเตรียมพร้อมก่อน-deploy)
2. [Deploy บน Vercel (แนะนำ)](#2-deploy-บน-vercel-แนะนำ)
3. [Deploy บน VPS/Hosting ทั่วไป](#3-deploy-บน-vpshosting-ทั่วไป)
4. [Checklist ก่อน Deploy](#4-checklist-ก่อน-deploy)
5. [การทดสอบหลัง Deploy](#5-การทดสอบหลัง-deploy)

---

## 1. การเตรียมพร้อมก่อน Deploy

### 1.1 สร้างไฟล์ `.env.local` หรือ `.env.production`

```env
# Database (MySQL)
DATABASE_URL="mysql://username:password@host:3306/database_name"

# NextAuth
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="generate-random-secret-min-32-characters-here"

# Thaibulksms API (สำหรับ OTP/SMS)
THAIBULKSMS_API_KEY="your-api-key"
THAIBULKSMS_API_SECRET="your-api-secret"

# Node Environment
NODE_ENV="production"
```

### 1.2 Generate NEXTAUTH_SECRET

```bash
# วิธีที่ 1: ใช้ OpenSSL (Linux/Mac)
openssl rand -base64 32

# วิธีที่ 2: ใช้ Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# วิธีที่ 3: ใช้เว็บไซต์
# ไปที่ https://generate-secret.vercel.app/32
```

### 1.3 เตรียมฐานข้อมูล MySQL

1. สร้าง database ใหม่
2. ตั้งค่า user และ password
3. อัปเดต `DATABASE_URL` ใน `.env`

### 1.4 Setup Database Schema

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# หรือใช้ Migration (แนะนำสำหรับ Production)
npx prisma migrate dev --name init
```

### 1.5 สร้าง Admin User

```bash
npm run create-admin admin@wse.com "YourPassword123" "Super Admin"
```

---

## 2. Deploy บน Vercel (แนะนำ)

### 2.1 ติดตั้ง Vercel CLI

```bash
npm i -g vercel
```

### 2.2 Deploy ผ่าน Vercel CLI

```bash
# 1. Login
vercel login

# 2. Deploy
vercel

# 3. Deploy to Production
vercel --prod
```

### 2.3 Deploy ผ่าน Vercel Dashboard

1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก **Add New Project**
3. Import จาก GitHub/GitLab/Bitbucket
4. ตั้งค่า Environment Variables:
   ```
   DATABASE_URL
   NEXTAUTH_URL
   NEXTAUTH_SECRET
   THAIBULKSMS_API_KEY
   THAIBULKSMS_API_SECRET
   NODE_ENV=production
   ```
5. คลิก **Deploy**

### 2.4 ตั้งค่า Build Command (ถ้าจำเป็น)

```json
// vercel.json (optional)
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### 2.5 Post-Deploy Scripts

หลังจาก deploy แล้ว:

1. เชื่อมต่อ database และรัน Prisma:
   ```bash
   npm run db:generate
   npm run db:push
   ```

2. สร้าง Admin user:
   ```bash
   npm run create-admin admin@wse.com "Password123" "Super Admin"
   ```

---

## 3. Deploy บน VPS/Hosting ทั่วไป

### 3.1 เตรียม Server

**Requirements:**
- Node.js 18+ หรือ 22+
- MySQL 8.0+
- PM2 (สำหรับ process management)

### 3.2 Setup ขั้นตอน

#### 1. Clone หรือ Upload โปรเจกต์

```bash
# Option 1: Git
git clone your-repo-url
cd wse-website

# Option 2: Upload ผ่าน FTP/SFTP
# อัพโหลดไฟล์ทั้งหมดไปยัง server
```

#### 2. ติดตั้ง Dependencies

```bash
npm install --production
```

#### 3. สร้างไฟล์ `.env.local`

```bash
nano .env.local
# หรือ
vi .env.local
```

ใส่ค่า environment variables ทั้งหมด

#### 4. Build โปรเจกต์

```bash
npm run build
```

#### 5. Setup Database

```bash
npm run db:generate
npm run db:push
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

#### 6. เริ่ม Production Server

**Option A: ใช้ PM2 (แนะนำ)**

```bash
# ติดตั้ง PM2
npm install -g pm2

# เริ่ม server
pm2 start npm --name "wse-website" -- start

# ตั้งค่าให้รันอัตโนมัติเมื่อ server restart
pm2 startup
pm2 save

# ดู logs
pm2 logs wse-website

# Restart
pm2 restart wse-website

# Stop
pm2 stop wse-website
```

**Option B: ใช้ systemd (Linux)**

สร้างไฟล์ `/etc/systemd/system/wse-website.service`:

```ini
[Unit]
Description=WSE Website Next.js App
After=network.target

[Service]
Type=simple
User=your-user
WorkingDirectory=/path/to/wse-website
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

```bash
# Enable และ start service
sudo systemctl enable wse-website
sudo systemctl start wse-website
sudo systemctl status wse-website
```

#### 7. Setup Reverse Proxy (Nginx)

สร้างไฟล์ `/etc/nginx/sites-available/wse-website`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/wse-website /etc/nginx/sites-enabled/

# Test และ reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

#### 8. Setup SSL (Let's Encrypt)

```bash
# ติดตั้ง Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal (จะทำงานอัตโนมัติ)
sudo certbot renew --dry-run
```

---

## 4. Checklist ก่อน Deploy

### ✅ Environment Variables
- [ ] `DATABASE_URL` ถูกต้องและเชื่อมต่อได้
- [ ] `NEXTAUTH_URL` ตั้งเป็น production URL
- [ ] `NEXTAUTH_SECRET` สุ่มและปลอดภัย (32+ characters)
- [ ] `THAIBULKSMS_API_KEY` และ `SECRET` ถูกต้อง (ถ้าใช้ OTP)
- [ ] `NODE_ENV=production`

### ✅ Database
- [ ] Database สร้างแล้ว
- [ ] User มีสิทธิ์เข้าถึง database
- [ ] รัน `npm run db:generate` สำเร็จ
- [ ] รัน `npm run db:push` สำเร็จ
- [ ] มี Admin user ในระบบ

### ✅ Build & Test
- [ ] `npm run build` สำเร็จไม่มี error
- [ ] ทดสอบ `npm start` ทำงานได้
- [ ] ไฟล์ `.env.local` ถูกต้อง

### ✅ File Upload
- [ ] โฟลเดอร์ `public/uploads` มีอยู่
- [ ] มีสิทธิ์เขียนไฟล์ใน `public/uploads`
- [ ] ตั้งค่า `chmod 755 public/uploads` (Linux)

### ✅ Security
- [ ] ไม่ commit `.env` ขึ้น Git
- [ ] Admin password แข็งแรง
- [ ] Database password แข็งแรง

---

## 5. การทดสอบหลัง Deploy

### 5.1 ทดสอบ Frontend

1. **หน้าแรก**
   - [ ] เปิด `https://your-domain.com` ได้
   - [ ] Hero section แสดง
   - [ ] บทความล่าสุดแสดง (ถ้ามี)

2. **หน้า Blog**
   - [ ] เปิด `/blog` ได้
   - [ ] แสดงรายการบทความ

3. **Lead Form**
   - [ ] ฟอร์มแสดง
   - [ ] ส่งข้อมูลได้
   - [ ] มี validation

4. **CEFR Test**
   - [ ] เปิด `/test-your-english/cefr` ได้
   - [ ] แบบทดสอบทำงาน

### 5.2 ทดสอบ Admin Dashboard

1. **Login**
   - [ ] เปิด `/admin/login` ได้
   - [ ] Login ด้วย admin account ได้
   - [ ] Redirect ไป `/admin` หลัง login

2. **CRUD Operations**
   - [ ] สร้างบทความใหม่ได้
   - [ ] อัพโหลดรูปภาพได้
   - [ ] แก้ไข/ลบบทความได้
   - [ ] สร้าง/แก้ไขหมวดหมู่และ Tags ได้

3. **Leads Management**
   - [ ] ดู Leads ได้
   - [ ] เปลี่ยนสถานะได้

4. **Settings**
   - [ ] เปิด/ปิด OTP ได้
   - [ ] ตั้งค่า SMTP ได้

### 5.3 ทดสอบ API

```bash
# ทดสอบ API Articles
curl https://your-domain.com/api/articles

# ทดสอบ API Locations
curl https://your-domain.com/api/locations

# ทดสอบ API Courses
curl https://your-domain.com/api/courses
```

### 5.4 ทดสอบ OTP/SMS

1. เปิด OTP ใน Settings
2. ไป `/test-your-english/cefr`
3. กรอกเบอร์โทร
4. ตรวจสอบว่าได้รับ OTP

---

## 6. การแก้ไขปัญหาทั่วไป (Troubleshooting)

### ❌ Error: Cannot connect to database

**แก้ไข:**
- ตรวจสอบ `DATABASE_URL` ถูกต้อง
- ตรวจสอบ database server เปิดอยู่
- ตรวจสอบ firewall rules

### ❌ Error: NEXTAUTH_SECRET is not set

**แก้ไข:**
- ตั้งค่า `NEXTAUTH_SECRET` ใน environment variables
- รันใหม่: `vercel env pull` หรือ restart server

### ❌ Error: Cannot upload files

**แก้ไข:**
- ตรวจสอบโฟลเดอร์ `public/uploads` มีอยู่
- ตั้งค่า permissions: `chmod 755 public/uploads` (Linux)
- ตรวจสอบ disk space

### ❌ Build fails on Vercel

**แก้ไข:**
- ตรวจสอบ Node.js version (ควรเป็น 18+ หรือ 22+)
- ตรวจสอบ environment variables ทั้งหมด
- ดู build logs ใน Vercel dashboard

### ❌ Images not loading

**แก้ไข:**
- ตรวจสอบ URL ของรูปภาพถูกต้อง
- ตรวจสอบ `public/uploads` ถูก deploy ขึ้นไปด้วย
- ใช้ absolute URL ถ้าจำเป็น

---

## 7. การ Update โปรเจกต์

### สำหรับ Vercel

```bash
# Pull code ใหม่
git pull origin main

# Deploy ใหม่
vercel --prod
```

### สำหรับ VPS

```bash
# Pull code ใหม่
git pull origin main

# Install dependencies (ถ้ามี package ใหม่)
npm install --production

# Build ใหม่
npm run build

# Restart server
pm2 restart wse-website
# หรือ
sudo systemctl restart wse-website
```

### Update Database Schema

```bash
# ถ้ามี schema เปลี่ยนแปลง
npm run db:generate
npm run db:push
```

---

## 8. ข้อมูลติดต่อและ Support

หากพบปัญหาหรือต้องการความช่วยเหลือ:

1. ตรวจสอบ logs:
   ```bash
   # Vercel
   vercel logs

   # PM2
   pm2 logs wse-website

   # systemd
   sudo journalctl -u wse-website -f
   ```

2. ตรวจสอบ database connection:
   ```bash
   npm run db:studio
   ```

3. ตรวจสอบ Prisma schema:
   ```bash
   npx prisma validate
   ```

---

## 🎉 เสร็จสิ้น!

หลังจาก deploy สำเร็จแล้ว ลูกค้าสามารถ:

1. ✅ เข้าใช้งานเว็บไซต์ได้ที่ `https://your-domain.com`
2. ✅ Login Admin ที่ `/admin/login`
3. ✅ จัดการเนื้อหาผ่าน Admin Dashboard
4. ✅ รับ Leads จากฟอร์ม
5. ✅ ทดสอบ CEFR Test

**หมายเหตุ:** อย่าลืมแจ้ง credentials ให้ลูกค้า:
- Admin Email: `admin@wse.com`
- Admin Password: `(ที่ตั้งไว้)`
- Admin URL: `https://your-domain.com/admin/login`
