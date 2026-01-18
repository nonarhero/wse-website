# วิธีอัพเกรด Node.js เป็น 20+ (Windows)

## ขั้นตอน

### 1. ติดตั้ง nvm-windows (ถ้ายังไม่มี)

```powershell
# ไปที่: https://github.com/coreybutler/nvm-windows/releases
# ดาวน์โหลด nvm-setup.exe และติดตั้ง
```

### 2. เปิด PowerShell เป็น Administrator

### 3. ติดตั้ง Node.js 20

```powershell
nvm install 20.11.0
nvm use 20.11.0
```

### 4. ตรวจสอบเวอร์ชัน

```powershell
node --version
# ควรเห็น: v20.11.0 หรือ v20.x.x
```

### 5. อัพเดท Prisma เป็นเวอร์ชันล่าสุด

```powershell
cd d:\wallstreet-demo\Cursor\wse-website
npm install prisma@latest --save-dev
npm install @prisma/client@latest --save
```

### 6. Generate Prisma Client ใหม่

```powershell
npx prisma generate
# ตอนนี้จะใช้ Prisma 7.x แล้ว
```

## วิธีที่ 2: ดาวน์โหลดจากเว็บไซต์

1. ไปที่: https://nodejs.org/
2. ดาวน์โหลด Node.js 20 LTS (เวอร์ชัน 20.x.x)
3. ติดตั้งตามปกติ
4. รีสตาร์ท Terminal/PowerShell

## ข้อดีของ Node.js 20+

✅ Prisma 7.x - Performance ดีกว่า 30%+
✅ Node.js 20 LTS - รองรับยาวๆ
✅ Security patches ล่าสุด
✅ Features JavaScript ใหม่ๆ

## สลับเวอร์ชัน (ถ้าใช้ nvm)

```powershell
nvm use 18.18.2  # กลับไป Node.js 18
nvm use 20.11.0  # ใช้ Node.js 20
nvm list         # ดูรายการเวอร์ชันที่ติดตั้ง
```
