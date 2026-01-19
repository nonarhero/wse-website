# 🔧 วิธี Setup Database และ Admin User บน Vercel

## ❌ ปัญหา: หน้า Admin Login ขาว (Blank Page)

**สาเหตุที่เป็นไปได้:**
1. Database ยังไม่ได้ setup (Prisma schema ยังไม่ถูก push)
2. Environment Variables ไม่ครบหรือไม่ถูกต้อง
3. Runtime error (ตรวจสอบ Vercel Logs)

---

## ✅ ขั้นตอนแก้ไข

### 1. ตรวจสอบ Environment Variables บน Vercel

**ไปที่:** Vercel Dashboard > Project > Settings > Environment Variables

**ต้องมี:**
- `DATABASE_URL` - Connection string ของ MySQL database
- `NEXTAUTH_URL` - Production URL (เช่น `https://wse-website.vercel.app`)
- `NEXTAUTH_SECRET` - Random secret (32+ characters)

**ตรวจสอบ:**
- `DATABASE_URL` ถูกต้องและเชื่อมต่อได้จาก Vercel servers
- Database server allow connections จาก Vercel IPs หรือเป็น publicly accessible
- `NEXTAUTH_URL` ตรงกับ domain ที่ deploy

---

### 2. Setup Database Schema (Prisma)

**วิธีที่ 1: ใช้ Vercel CLI (แนะนำ)**

```powershell
# Install Vercel CLI (ถ้ายังไม่มี)
npm i -g vercel

# Login
vercel login

# Link กับ project
vercel link

# Push schema to database
vercel env pull .env.local  # ดึง env vars มา
npx prisma db push
```

**วิธีที่ 2: ใช้ Vercel Dashboard + Vercel Postgres/MySQL**

1. ไปที่ Vercel Dashboard > Storage
2. สร้าง Database (Postgres หรือ MySQL)
3. Copy connection string
4. ตั้งค่า `DATABASE_URL` ใน Environment Variables
5. รัน Prisma push ผ่าน Vercel CLI:

```powershell
vercel env pull .env.local
npx prisma db push
```

**วิธีที่ 3: ใช้ External MySQL Database**

1. ใช้ MySQL database จากที่อื่น (เช่น PlanetScale, Railway, หรือ MySQL hosting)
2. ตั้งค่า `DATABASE_URL` ใน Environment Variables:
   ```
   DATABASE_URL=mysql://username:password@host:port/database?sslaccept=strict
   ```
3. รัน Prisma push:

```powershell
vercel env pull .env.local
npx prisma db push
```

---

### 3. สร้าง Admin User

**หลังจาก setup database แล้ว:**

**วิธีที่ 1: ใช้ Vercel CLI**

```powershell
# 1. Link project และ pull env
vercel link
vercel env pull .env.local

# 2. Generate Prisma Client
npx prisma generate

# 3. Create Admin User
npm run create-admin admin@wse.com "YourPassword123" "Super Admin"
```

**วิธีที่ 2: สร้างผ่าน Database Studio**

```powershell
# เปิด Prisma Studio
npx prisma studio

# สร้าง user ใน database โดยตรง
# หรือใช้ SQL query:
```

```sql
-- Insert admin user (hash password ด้วย bcrypt ก่อน)
INSERT INTO User (id, email, password, name, role, createdAt, updatedAt)
VALUES ('clxxx', 'admin@wse.com', '$2a$10$hashedpassword...', 'Super Admin', 'SUPER_ADMIN', NOW(), NOW());
```

---

### 4. Redeploy หลัง Setup

หลังจากตั้งค่า Environment Variables หรือ database แล้ว:

**วิธีที่ 1: ผ่าน Dashboard**
1. Vercel Dashboard > Deployments
2. คลิก "Redeploy" ใน deployment ล่าสุด

**วิธีที่ 2: ผ่าน CLI**
```powershell
vercel --prod
```

---

### 5. ตรวจสอบ Logs

ถ้ายังมีปัญหา:

1. **Vercel Dashboard > Deployments > [Latest Deployment] > Logs**
   - ดู Build Logs
   - ดู Runtime Logs (Function Logs)

2. **ตรวจสอบ Function Logs:**
   - Vercel Dashboard > Settings > Functions
   - ดู error messages

---

## 🔍 Troubleshooting

### Error: "Cannot connect to database"

**แก้ไข:**
- ตรวจสอบ `DATABASE_URL` ถูกต้อง
- ตรวจสอบ database server allow connections จาก Vercel
- ใช้ SSL connection ถ้าจำเป็น: `?sslaccept=strict`

### Error: "Prisma Client not generated"

**แก้ไข:**
```powershell
# Generate Prisma Client (ทำอัตโนมัติใน postinstall script)
npm install
```

### Error: "NEXTAUTH_SECRET is not set"

**แก้ไข:**
- ตั้งค่า `NEXTAUTH_SECRET` ใน Environment Variables
- Generate secret:
  ```powershell
  node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
  ```

### หน้า Admin Login ขาว (Blank Page)

**ตรวจสอบ:**
1. เปิด Browser Console (F12) ดู errors
2. ตรวจสอบ Vercel Function Logs
3. ตรวจสอบ Environment Variables ครบถ้วน
4. ตรวจสอบ Database connection

---

## 📋 Checklist

- [ ] Environment Variables ครบถ้วน (`DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`)
- [ ] Database เชื่อมต่อได้จาก Vercel
- [ ] รัน `npx prisma db push` สำเร็จ
- [ ] มี Admin user ใน database
- [ ] Redeploy หลัง setup แล้ว

---

## 🚀 Quick Commands

```powershell
# 1. Link project
vercel link

# 2. Pull environment variables
vercel env pull .env.local

# 3. Setup database
npx prisma generate
npx prisma db push

# 4. Create admin user
npm run create-admin admin@wse.com "Password123" "Super Admin"

# 5. Redeploy (ถ้าจำเป็น)
vercel --prod
```

---

## 📞 ตรวจสอบ Logs บน Vercel

1. ไปที่: **Vercel Dashboard > Deployments**
2. คลิก deployment ล่าสุด
3. ดู **"Runtime Logs"** หรือ **"Function Logs"**
4. ตรวจสอบ errors ที่แสดง

หากยังมีปัญหา ให้ตรวจสอบ error logs และแจ้งข้อความ error มาเพื่อช่วยแก้ไข
