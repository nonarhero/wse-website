# 🚀 คำสั่ง Push ไป GitHub (Copy-Paste)

## หลังจากสร้าง GitHub Repository แล้ว

### แทนที่ `YOUR_REPO_NAME` ด้วยชื่อ repository ที่สร้าง

```powershell
# 1. เพิ่ม remote repository
git remote add origin https://github.com/nonarhero/YOUR_REPO_NAME.git

# 2. เปลี่ยน branch เป็น main
git branch -M main

# 3. Push ขึ้น GitHub
git push -u origin main
```

---

## ถ้า Repository ชื่อ `wse-website`

```powershell
git remote add origin https://github.com/nonarhero/wse-website.git
git branch -M main
git push -u origin main
```

---

## ถ้ามี Error: "remote origin already exists"

```powershell
# ดู remote ที่มีอยู่
git remote -v

# ลบ remote เก่า
git remote remove origin

# เพิ่ม remote ใหม่
git remote add origin https://github.com/nonarhero/YOUR_REPO_NAME.git
```

---

## ถ้า GitHub ถาม Username/Password

**Username:** `nonarhero`

**Password:** ใช้ **Personal Access Token** (ไม่ใช่ GitHub password)

### วิธีสร้าง Personal Access Token:

1. ไปที่: https://github.com/settings/tokens
2. คลิก **"Generate new token (classic)"**
3. ตั้งชื่อ token (เช่น "wse-website-push")
4. เลือก scopes: **`repo`** (ให้สิทธิ์ทั้งหมด)
5. คลิก **"Generate token"**
6. **Copy token** (แสดงครั้งเดียว!)
7. ใช้ token นี้แทน password เมื่อ push

---

## ✅ Checklist

- [ ] สร้าง GitHub repository แล้ว
- [ ] รัน `git remote add origin ...`
- [ ] รัน `git branch -M main`
- [ ] รัน `git push -u origin main`
- [ ] Push สำเร็จ!
