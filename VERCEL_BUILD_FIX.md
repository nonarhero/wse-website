# 🔧 แก้ไข Build Error บน Vercel

## ❌ ปัญหา: `npm run build` exited with 1

## ✅ วิธีแก้ไข

### 1. อัปเดต package.json แล้ว (เสร็จแล้ว)

เพิ่ม `postinstall` script และแก้ `build` script:

```json
{
  "scripts": {
    "build": "prisma generate && next build",
    "postinstall": "prisma generate"
  }
}
```

### 2. ตรวจสอบ Environment Variables บน Vercel

ไปที่ Vercel Dashboard > Settings > Environment Variables:

**Required Variables:**
- `DATABASE_URL` - Connection string ของ MySQL database
- `NEXTAUTH_URL` - Production URL (เช่น https://your-domain.vercel.app)
- `NEXTAUTH_SECRET` - Random secret key (32+ characters)

**Optional Variables (ถ้าใช้):**
- `THAIBULKSMS_API_KEY`
- `THAIBULKSMS_API_SECRET`

### 3. ตรวจสอบ Prisma Schema

ตรวจสอบว่า `prisma/schema.prisma` ไม่มีปัญหา:

```bash
npx prisma validate
```

### 4. Build ใหม่บน Vercel

หลังจากแก้ไข:

1. **ผ่าน CLI:**
   ```bash
   git add .
   git commit -m "Fix build: add postinstall script"
   git push
   vercel --prod
   ```

2. **ผ่าน Dashboard:**
   - ไปที่ Vercel Dashboard
   - คลิก "Redeploy" ในล่าสุด deployment
   - หรือรอ auto-deploy เมื่อ push code

### 5. ดู Build Logs

ใน Vercel Dashboard:
1. ไปที่ Deployment ที่ล้มเหลว
2. คลิก "View Build Logs"
3. ดู error message ที่แสดง

## 🔍 Troubleshooting

### Error: "Prisma Client is not generated"

**แก้ไข:**
- ตรวจสอบ `postinstall` script ใน `package.json`
- หรือใส่ `prisma generate` ใน build script

### Error: "Cannot find module '@prisma/client'"

**แก้ไข:**
- ตรวจสอบว่า `@prisma/client` อยู่ใน `dependencies` (ไม่ใช่ `devDependencies`)
- รัน `npm install` อีกครั้ง

### Error: "DATABASE_URL is not set"

**แก้ไข:**
- ตั้งค่า `DATABASE_URL` ใน Environment Variables บน Vercel
- ใช้ connection string ที่ถูกต้อง

### Error: "TypeScript errors"

**แก้ไข:**
- ตรวจสอบ TypeScript errors ท้องถิ่น:
  ```bash
  npm run build
  ```
- แก้ไข errors ที่พบ
- Commit และ push ใหม่

### Error: "Module not found"

**แก้ไข:**
- ตรวจสอบว่า dependencies ครบถ้วนใน `package.json`
- ลบ `node_modules` และ `.next` แล้ว build ใหม่:
  ```bash
  rm -rf node_modules .next
  npm install
  npm run build
  ```

## 📝 Checklist

ก่อน deploy ใหม่:

- [ ] `postinstall` script มีใน `package.json`
- [ ] `build` script รวม `prisma generate`
- [ ] Environment variables ครบถ้วนบน Vercel
- [ ] `DATABASE_URL` ถูกต้องและเชื่อมต่อได้
- [ ] `NEXTAUTH_URL` ตั้งเป็น production URL
- [ ] `NEXTAUTH_SECRET` มีความยาว 32+ characters
- [ ] TypeScript errors แก้ไขแล้ว (ถ้ามี)
- [ ] Dependencies ครบถ้วน

## 🚀 Deploy ใหม่

```bash
# 1. Commit changes
git add .
git commit -m "Fix: Add postinstall script for Prisma"

# 2. Push to repository
git push origin main

# 3. Vercel จะ auto-deploy หรือ
vercel --prod
```

## 📞 ตรวจสอบ Build Logs

ถ้ายังมี error:
1. ไปที่ Vercel Dashboard > Deployments
2. คลิก deployment ที่ล้มเหลว
3. ดู "Build Logs" เพื่อดู error message
4. แก้ไขตาม error message
