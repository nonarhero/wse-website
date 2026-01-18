# วิธีแก้ปัญหา npm/nvm ไม่ทำงานหลังติดตั้ง nvm

## ปัญหา
หลังจากติดตั้ง nvm หรืออัพเกรด Node.js แล้ว PowerShell ไม่รู้จัก `node`, `npm`, หรือ `nvm`

## วิธีแก้

### วิธีที่ 1: รีสตาร์ท PowerShell (แนะนำ)

1. **ปิด PowerShell ทั้งหมด**
2. **เปิด PowerShell ใหม่**
3. ลอง `node --version` หรือ `npm --version`

### วิธีที่ 2: Refresh PATH ใน PowerShell ปัจจุบัน

```powershell
# Refresh PATH environment variable
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# ตรวจสอบ
node --version
npm --version
nvm version
```

### วิธีที่ 3: ใช้ nvm ใหม่ (ถ้า nvm ยังไม่ทำงาน)

1. **ตรวจสอบว่า nvm ติดตั้งสำเร็จ:**
   - ไปที่ `C:\Users\surap\AppData\Roaming\nvm` (หรือ path ที่ติดตั้ง)
   - ตรวจสอบว่ามีไฟล์ `settings.txt`

2. **รีสตาร์ท PowerShell เป็น Administrator**

3. **ลอง nvm อีกครั้ง:**
   ```powershell
   nvm version
   nvm list
   nvm use 22.11.0  # หรือเวอร์ชันที่ติดตั้ง
   ```

### วิธีที่ 4: ตรวจสอบ Environment Variables

1. **เปิด System Properties:**
   - กด `Win + R`
   - พิมพ์ `sysdm.cpl` แล้วกด Enter
   - คลิกแท็บ "Advanced"
   - คลิก "Environment Variables"

2. **ตรวจสอบ PATH:**
   - ดู User variables และ System variables
   - ตรวจสอบว่ามี path ของ nvm หรือ nodejs หรือไม่

3. **เพิ่ม PATH ถ้าไม่มี:**
   - ถ้าใช้ nvm: เพิ่ม `C:\Users\surap\AppData\Roaming\nvm`
   - ถ้าใช้ Node.js โดยตรง: เพิ่ม `C:\Program Files\nodejs`

### วิธีที่ 5: ติดตั้ง nvm ใหม่

1. **ดาวน์โหลด nvm-windows:**
   - https://github.com/coreybutler/nvm-windows/releases
   - ดาวน์โหลด `nvm-setup.exe`

2. **รัน installer เป็น Administrator**

3. **รีสตาร์ท PowerShell**

4. **ตรวจสอบ:**
   ```powershell
   nvm version
   nvm install 22.11.0
   nvm use 22.11.0
   ```

## ตรวจสอบว่า nvm ทำงาน

```powershell
# 1. ตรวจสอบ nvm
nvm version

# 2. ดูรายการ Node.js ที่ติดตั้ง
nvm list

# 3. ใช้ Node.js เวอร์ชันที่ต้องการ
nvm use 22.11.0

# 4. ตรวจสอบ Node.js และ npm
node --version
npm --version
```

## ถ้ายังไม่ได้ผล

1. **รีสตาร์ทคอมพิวเตอร์** (เพื่อให้ environment variables อัพเดทเต็มที่)
2. **ตรวจสอบ nvm installation path**
3. **ลองติดตั้ง Node.js โดยตรง** จาก https://nodejs.org/ (แทน nvm)

## หมายเหตุ

- nvm-windows ติดตั้งใน: `C:\Users\<username>\AppData\Roaming\nvm`
- Node.js ติดตั้งใน: `C:\Program Files\nodejs` (ถ้าไม่ใช้ nvm)
- PowerShell ต้องรีสตาร์ทหลังจากติดตั้ง/เปลี่ยน PATH
