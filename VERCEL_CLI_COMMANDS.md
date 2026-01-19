# 🚀 คำสั่ง Vercel CLI ที่ถูกต้อง

## ❌ คำสั่งผิด

```powershell
# ❌ ผิด - อย่าใส่ URL หลัง vercel
vercel https://vercel.com/surapan-ths-projects/wse-website
```

## ✅ คำสั่งที่ถูกต้อง

### 1. Link Project (เชื่อมต่อกับ Vercel Project)

```powershell
# Link กับ project (จะถามคำถาม)
vercel link

# หรือใช้ --yes เพื่อ auto-confirm
vercel link --yes
```

เมื่อ run `vercel link` จะถาม:
- Set up and develop? (Y/n) → ตอบ **Y**
- Which scope? → เลือก account ของคุณ
- Link to existing project? (Y/n) → ตอบ **Y**
- What's the name of your existing project? → พิมพ์ **wse-website**

### 2. Pull Environment Variables

```powershell
# ดึง environment variables มาบันทึกใน .env.local
vercel env pull .env.local
```

### 3. Deploy

```powershell
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

---

## 📋 ขั้นตอนทั้งหมด (Setup Database)

```powershell
# 1. Login (ถ้ายังไม่ได้ login)
vercel login

# 2. Link project
vercel link --yes

# 3. Pull environment variables
vercel env pull .env.local

# 4. Generate Prisma Client
npx prisma generate

# 5. Push database schema
npx prisma db push

# 6. สร้าง Admin User
npm run create-admin admin@wse.com "Password123" "Super Admin"

# 7. Redeploy (ถ้าจำเป็น)
vercel --prod
```

---

## 🔍 Troubleshooting

### Error: "Could not find project"

**แก้ไข:**
- ใช้ `vercel link` เพื่อ link กับ project
- หรือสร้าง project ใหม่: `vercel` (จะสร้างให้อัตโนมัติ)

### Error: "Not authenticated"

**แก้ไข:**
```powershell
vercel login
```

### Error: "Environment variables not found"

**แก้ไข:**
- ตั้งค่า Environment Variables บน Vercel Dashboard ก่อน
- แล้วรัน `vercel env pull .env.local`

---

## ✅ Checklist

- [ ] Login: `vercel login`
- [ ] Link project: `vercel link` (หรือ `vercel link --yes`)
- [ ] Pull env: `vercel env pull .env.local`
- [ ] Setup DB: `npx prisma db push`
- [ ] Create admin: `npm run create-admin`
- [ ] Redeploy: `vercel --prod` (ถ้าจำเป็น)
