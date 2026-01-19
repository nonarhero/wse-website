# 🚀 คู่มือ Push Code ขึ้น GitHub และ Deploy Vercel

## ✅ ขั้นตอนหลังจาก Commit แล้ว

### 1. สร้าง Repository บน GitHub

1. ไปที่ [github.com](https://github.com) และ Login
2. คลิก **"+"** (มุมบนขวา) > **"New repository"**
3. ตั้งชื่อ repository: `wse-website` (หรือชื่ออื่นที่ต้องการ)
4. เลือก **Public** หรือ **Private**
5. ⚠️ **อย่า** ติ๊ก "Add a README file", "Add .gitignore", หรือ "Choose a license" (เพราะมีไฟล์อยู่แล้ว)
6. คลิก **"Create repository"**

### 2. Connect กับ GitHub Repository

หลังจากสร้าง repository แล้ว GitHub จะแสดง URL ให้:

```powershell
# เพิ่ม remote repository (แทน YOUR_USERNAME ด้วย GitHub username ของคุณ)
git remote add origin https://github.com/nonarhero/wse-website.git

# หรือถ้าใช้ SSH:
# git remote add origin git@github.com:nonarhero/wse-website.git
```

### 3. เปลี่ยน Branch เป็น main (ถ้ายังเป็น master)

```powershell
git branch -M main
```

### 4. Push Code ขึ้น GitHub

```powershell
git push -u origin main
```

ถ้า GitHub ต้องการ authentication:
- ใช้ **Personal Access Token** (ไม่ใช่ password)
- หรือใช้ **GitHub Desktop**
- หรือใช้ **SSH Key**

---

## 🔐 GitHub Authentication

### วิธีที่ 1: Personal Access Token (แนะนำ)

1. ไปที่ GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
2. คลิก **"Generate new token (classic)"**
3. ตั้งชื่อ token
4. เลือก scopes: `repo` (ให้สิทธิ์ทั้งหมด)
5. คลิก **"Generate token"**
6. Copy token (แสดงครั้งเดียว!)
7. เมื่อ push จะถาม username/password:
   - Username: `nonarhero`
   - Password: **ใส่ token** (ไม่ใช่ GitHub password)

### วิธีที่ 2: GitHub CLI

```powershell
# ติดตั้ง GitHub CLI
winget install GitHub.cli

# Login
gh auth login

# Push
git push -u origin main
```

---

## 📋 ขั้นตอนทั้งหมด (Copy-Paste)

```powershell
# 1. เพิ่ม remote (แทน YOUR_REPO_NAME ด้วยชื่อ repository ที่สร้าง)
git remote add origin https://github.com/nonarhero/YOUR_REPO_NAME.git

# 2. เปลี่ยน branch เป็น main
git branch -M main

# 3. Push ขึ้น GitHub
git push -u origin main
```

---

## 🌐 Deploy บน Vercel

### หลังจาก Push ไป GitHub แล้ว:

**วิธีที่ 1: ผ่าน Vercel Dashboard (แนะนำ)**

1. ไปที่ [vercel.com](https://vercel.com)
2. Login (ใช้ GitHub account ถ้าได้)
3. คลิก **"Add New Project"**
4. เลือก repository `wse-website` จาก GitHub
5. ตั้งค่า:
   - **Framework Preset:** Next.js (auto-detect)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
6. **Environment Variables:**
   - `DATABASE_URL` = `mysql://user:pass@host:3306/db`
   - `NEXTAUTH_URL` = `https://your-project.vercel.app`
   - `NEXTAUTH_SECRET` = `[generate-random-32-chars]`
7. คลิก **"Deploy"**

**วิธีที่ 2: ผ่าน Vercel CLI**

```powershell
# ติดตั้ง Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## ✅ Checklist

- [x] Git user config ตั้งค่าแล้ว
- [x] Commit สำเร็จแล้ว
- [ ] สร้าง GitHub repository
- [ ] เพิ่ม remote (`git remote add origin`)
- [ ] Push ขึ้น GitHub (`git push`)
- [ ] ตั้งค่า Environment Variables บน Vercel
- [ ] Deploy บน Vercel

---

## 🎯 คำสั่งแบบเร็ว (หลังจากสร้าง GitHub repo)

```powershell
# แทน YOUR_REPO_NAME ด้วยชื่อ repository
git remote add origin https://github.com/nonarhero/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```
