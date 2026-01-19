# ⚡ Quick Setup Database บน Vercel (Copy-Paste)

## 🔧 Setup Database Schema

```powershell
# 1. ติดตั้ง Vercel CLI (ถ้ายังไม่มี)
npm i -g vercel

# 2. Login
vercel login

# 3. Link กับ project (เลือก project `wse-website`)
vercel link

# 4. Pull environment variables มาเก็บใน .env.local
vercel env pull .env.local

# 5. Generate Prisma Client
npx prisma generate

# 6. Push schema ไปยัง database
npx prisma db push
```

---

## 👤 สร้าง Admin User

```powershell
# สร้าง admin user (ทำหลังจาก prisma db push สำเร็จแล้ว)
npm run create-admin admin@wse.com "Password123" "Super Admin"
```

---

## 🔄 Redeploy

หลังจาก setup database แล้ว:

```powershell
# Redeploy บน Vercel
vercel --prod
```

หรือ
- ไปที่ Vercel Dashboard
- คลิก "Redeploy" ใน deployment ล่าสุด

---

## ✅ ตรวจสอบ

1. **ตรวจสอบ Database:**
   ```powershell
   npx prisma studio
   # จะเปิด browser ที่ http://localhost:5555
   # ตรวจสอบว่ามี tables และ admin user หรือไม่
   ```

2. **ตรวจสอบ Environment Variables:**
   - Vercel Dashboard > Settings > Environment Variables
   - ตรวจสอบว่าทั้ง 3 ตัวแปรมีอยู่

3. **ตรวจสอบ Logs:**
   - Vercel Dashboard > Deployments > [Latest] > Runtime Logs
   - ดูว่ามี errors หรือไม่

---

## ⚠️ สำคัญ

- `DATABASE_URL` ต้องเชื่อมต่อได้จาก Vercel servers
- ถ้าใช้ external MySQL database ต้อง allow connections จาก Vercel IPs
- ถ้าใช้ SSL connection ให้เพิ่ม `?sslaccept=strict` ใน `DATABASE_URL`
