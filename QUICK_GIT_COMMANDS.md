# ⚡ คำสั่ง Git สำหรับ Deploy (สรุป)

## 📋 ขั้นตอนหลังจาก `git init`

### 1. ตั้งค่า Git User (ต้องทำก่อน)

```powershell
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### 2. Commit Files

```powershell
git add .
git commit -m "Initial commit: WSE Website"
```

### 3. สร้าง Repository บน GitHub/GitLab

1. ไปที่ GitHub.com หรือ GitLab.com
2. สร้าง repository ใหม่ (อย่า initialize with README)
3. Copy repository URL

### 4. Connect และ Push

```powershell
# เพิ่ม remote
git remote add origin https://github.com/YOUR_USERNAME/wse-website.git

# เปลี่ยน branch เป็น main
git branch -M main

# Push
git push -u origin main
```

### 5. Deploy บน Vercel

**ผ่าน Dashboard:**
1. ไปที่ vercel.com > Add New Project
2. Import จาก GitHub
3. ตั้งค่า Environment Variables
4. Deploy

**หรือผ่าน CLI:**
```powershell
vercel --prod
```

---

## ⚠️ สำคัญ!

- ✅ `.env` อยู่ใน `.gitignore` แล้ว (แก้ไขแล้ว)
- ✅ `.env` ไม่ถูก commit (reset แล้ว)
- ✅ Build สำเร็จแล้ว (`npm run build` ผ่าน)

---

## 🎯 ข้อมูลที่ต้องตั้งค่าบน Vercel

**Environment Variables:**
- `DATABASE_URL` = mysql://...
- `NEXTAUTH_URL` = https://your-project.vercel.app
- `NEXTAUTH_SECRET` = [generate-random-32-chars]
