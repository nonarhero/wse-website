# 🔧 คู่มือการตั้งค่า Git และ Deploy

## ✅ ขั้นตอนหลังจาก `git init`

### 1. ตั้งค่า Git User (สำคัญ!)

```bash
# ตั้งค่าสำหรับโปรเจกต์นี้เท่านั้น
git config user.email "your-email@example.com"
git config user.name "Your Name"

# หรือตั้งแบบ global (ใช้ทุก repository)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"
```

### 2. ตรวจสอบ .env ไม่ถูก commit (สำคัญมาก!)

`.env` ไฟล์ควรอยู่ใน `.gitignore` และไม่ถูก commit ขึ้น Git (เพราะมี secrets)

**ตรวจสอบ:**
```bash
# ดูว่า .env ถูก ignore หรือยัง
git check-ignore .env
```

**ถ้ายังไม่ถูก ignore:**
- ตรวจสอบว่า `.gitignore` มี `.env` หรือไม่
- ถ้าไม่มี ให้เพิ่ม `.env` ลงใน `.gitignore`

**ถ้า .env ถูก add แล้ว:**
```bash
# Unstage .env file
git reset HEAD .env

# ตรวจสอบว่า .env อยู่ใน .gitignore
# ถ้ายังไม่มี ให้เพิ่ม `.env` ลงใน .gitignore
```

### 3. Commit Files

```bash
# Commit files
git commit -m "Initial commit: WSE Website - Complete admin dashboard, CEFR test system, and blog"
```

### 4. สร้าง Remote Repository (GitHub/GitLab)

**Option A: สร้างบน GitHub**
1. ไปที่ [github.com](https://github.com)
2. คลิก "New repository"
3. ตั้งชื่อ repository (เช่น `wse-website`)
4. **อย่า** ติ๊ก "Initialize with README" (เพราะมีไฟล์อยู่แล้ว)
5. คลิก "Create repository"

**Option B: สร้างบน GitLab**
1. ไปที่ [gitlab.com](https://gitlab.com)
2. คลิก "New project"
3. เลือก "Create blank project"
4. ตั้งชื่อ project
5. คลิก "Create project"

### 5. Connect และ Push

```bash
# เพิ่ม remote repository
git remote add origin https://github.com/YOUR_USERNAME/wse-website.git
# หรือ
git remote add origin https://gitlab.com/YOUR_USERNAME/wse-website.git

# เปลี่ยนชื่อ branch เป็น main (ถ้ายังเป็น master)
git branch -M main

# Push ไปยัง remote
git push -u origin main
```

### 6. Deploy บน Vercel

**วิธีที่ 1: ผ่าน GitHub Integration (แนะนำ)**
1. ไปที่ [vercel.com](https://vercel.com)
2. คลิก "Add New Project"
3. Import project จาก GitHub
4. เลือก repository `wse-website`
5. ตั้งค่า Environment Variables (DATABASE_URL, NEXTAUTH_URL, NEXTAUTH_SECRET)
6. คลิก "Deploy"

**วิธีที่ 2: ผ่าน Vercel CLI**
```bash
# Install Vercel CLI (ถ้ายังไม่มี)
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## ⚠️ สำคัญ: อย่า Commit .env!

**`.env` ไฟล์มี secrets:**
- Database passwords
- API keys
- NextAuth secrets

**ถ้า commit ไปแล้ว:**
1. ลบออกจาก Git history (ถ้า push แล้วต้องทำ force push - **ระวัง!**)
2. เปลี่ยน secrets ทั้งหมด (เพราะถูก commit ไปแล้ว)

**วิธีป้องกัน:**
- ตรวจสอบ `.gitignore` มี `.env` และ `.env.local`
- ตรวจสอบ `git status` ก่อน commit
- ใช้ `.env.example` สำหรับ template (ไม่มี secrets)

---

## 📝 .gitignore ที่แนะนำ

ตรวจสอบว่า `.gitignore` มี:

```
# Environment variables
.env
.env.local
.env*.local

# Dependencies
node_modules/

# Build outputs
.next/
out/
dist/

# Prisma
prisma/migrations/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db
```

---

## ✅ Checklist ก่อน Push

- [ ] ตั้งค่า `user.email` และ `user.name`
- [ ] `.env` อยู่ใน `.gitignore`
- [ ] `.env` ไม่ถูก commit (ตรวจสอบ `git status`)
- [ ] Commit สำเร็จ
- [ ] Remote repository สร้างแล้ว
- [ ] Push สำเร็จ

---

## 🚀 หลังจาก Deploy บน Vercel

1. **ตั้งค่า Environment Variables:**
   - `DATABASE_URL`
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`

2. **Setup Database:**
   - รัน `npm run db:push` ผ่าน Vercel CLI หรือ Vercel Dashboard
   - หรือใช้ Vercel Postgres (MySQL compatible)

3. **สร้าง Admin User:**
   - รัน `npm run create-admin` ผ่าน Vercel CLI

---

## 📞 Troubleshooting

### Error: "fatal: unable to auto-detect email address"
**แก้ไข:**
```bash
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### Error: ".env is not ignored"
**แก้ไข:**
- เพิ่ม `.env` ใน `.gitignore`
- รัน `git reset HEAD .env` (ถ้ายังไม่ commit)
- Commit `.gitignore` ก่อน

### Error: "remote origin already exists"
**แก้ไข:**
```bash
# ดู remote ที่มีอยู่
git remote -v

# ลบ remote เก่า (ถ้าต้องการ)
git remote remove origin

# เพิ่ม remote ใหม่
git remote add origin NEW_URL
```
