# 🗄️ คู่มือตั้งค่า MySQL Server สำหรับ Vercel

## 📋 สารบัญ
1. [เตรียม MySQL Server](#1-เตรียม-mysql-server)
2. [ตั้งค่า Remote Access](#2-ตั้งค่า-remote-access)
3. [ตั้งค่า Firewall](#3-ตั้งค่า-firewall)
4. [สร้าง Database และ User](#4-สร้าง-database-และ-user)
5. [ตั้งค่า DATABASE_URL บน Vercel](#5-ตั้งค่า-database_url-บน-vercel)
6. [ทดสอบการเชื่อมต่อ](#6-ทดสอบการเชื่อมต่อ)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. เตรียม MySQL Server

### 1.1 ตรวจสอบ MySQL Version

```bash
# บน Linux/Ubuntu
mysql --version

# หรือ
mysql -u root -p -e "SELECT VERSION();"
```

**แนะนำ:** ใช้ MySQL 8.0+ หรือ MariaDB 10.5+

---

## 2. ตั้งค่า Remote Access

### 2.1 แก้ไข MySQL Configuration

#### บน Linux/Ubuntu:

```bash
# 1. แก้ไขไฟล์ my.cnf หรือ mysqld.cnf
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# หรือ
sudo nano /etc/my.cnf
```

**เพิ่มหรือแก้ไขบรรทัดนี้:**

```ini
[mysqld]
bind-address = 0.0.0.0  # เปลี่ยนจาก 127.0.0.1 เป็น 0.0.0.0
port = 3306
```

**หมายเหตุ:** 
- `bind-address = 0.0.0.0` = รับ connections จากทุก IP
- `bind-address = 127.0.0.1` = รับ connections จาก localhost เท่านั้น

#### บน Windows:

แก้ไขไฟล์ `my.ini` (มักอยู่ที่ `C:\ProgramData\MySQL\MySQL Server X.X\my.ini`):

```ini
[mysqld]
bind-address = 0.0.0.0
port = 3306
```

### 2.2 Restart MySQL Service

```bash
# Linux/Ubuntu
sudo systemctl restart mysql
# หรือ
sudo service mysql restart

# Windows (Run as Administrator)
net stop MySQL80
net start MySQL80
```

### 2.3 ตรวจสอบว่า MySQL ฟังที่ 0.0.0.0

```bash
# Linux/Ubuntu
sudo netstat -tlnp | grep mysql
# หรือ
sudo ss -tlnp | grep mysql

# ควรเห็น:
# tcp  0  0  0.0.0.0:3306  0.0.0.0:*  LISTEN  ...
```

---

## 3. ตั้งค่า Firewall

### 3.1 Linux (UFW - Ubuntu Firewall)

```bash
# เปิด port 3306
sudo ufw allow 3306/tcp

# ตรวจสอบ
sudo ufw status
```

### 3.2 Linux (firewalld - CentOS/RHEL)

```bash
# เปิด port 3306
sudo firewall-cmd --permanent --add-port=3306/tcp
sudo firewall-cmd --reload

# ตรวจสอบ
sudo firewall-cmd --list-ports
```

### 3.3 Windows Firewall

1. เปิด **Windows Defender Firewall with Advanced Security**
2. คลิก **Inbound Rules** > **New Rule**
3. เลือก **Port** > **TCP** > **Specific local ports: 3306**
4. เลือก **Allow the connection**
5. ตั้งชื่อ: "MySQL Server 3306"

### 3.4 Cloud Provider Firewall (AWS, GCP, Azure, DigitalOcean)

#### AWS EC2:
- Security Group > Inbound Rules > Add Rule
- Type: MySQL/Aurora (3306)
- Source: `0.0.0.0/0` (หรือเฉพาะ Vercel IPs - ดูด้านล่าง)

#### DigitalOcean:
- Networking > Firewalls > Add Rule
- Inbound Rules > MySQL (3306)
- Sources: `0.0.0.0/0` (หรือเฉพาะ Vercel IPs)

#### Vercel IPs (ถ้าต้องการจำกัดเฉพาะ Vercel):

Vercel ใช้ dynamic IPs แต่สามารถใช้:
- `0.0.0.0/0` (เปิดให้ทุก IP - **ไม่แนะนำสำหรับ production**)
- หรือใช้ **SSL/TLS** และจำกัดด้วย user permissions

---

## 4. สร้าง Database และ User

### 4.1 เข้าสู่ MySQL

```bash
mysql -u root -p
```

### 4.2 สร้าง Database

```sql
-- สร้าง database
CREATE DATABASE wse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- ตรวจสอบ
SHOW DATABASES;
```

### 4.3 สร้าง User สำหรับ Remote Access

```sql
-- สร้าง user ที่สามารถเชื่อมต่อจาก IP ใดก็ได้
CREATE USER 'wse_user'@'%' IDENTIFIED BY 'YourStrongPassword123!';

-- หรือจำกัดเฉพาะ Vercel IPs (ถ้ารู้ IP)
-- CREATE USER 'wse_user'@'76.76.21.21' IDENTIFIED BY 'YourStrongPassword123!';

-- ให้สิทธิ์ทั้งหมดกับ database wse
GRANT ALL PRIVILEGES ON wse.* TO 'wse_user'@'%';

-- หรือให้สิทธิ์เฉพาะที่จำเป็น (แนะนำสำหรับ production)
-- GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER, INDEX ON wse.* TO 'wse_user'@'%';

-- อัปเดต privileges
FLUSH PRIVILEGES;

-- ตรวจสอบ
SELECT user, host FROM mysql.user WHERE user = 'wse_user';
```

**หมายเหตุ:**
- `'wse_user'@'%'` = เชื่อมต่อได้จาก IP ใดก็ได้
- `'wse_user'@'192.168.1.%'` = เชื่อมต่อได้จาก subnet 192.168.1.x
- `'wse_user'@'specific-ip'` = เชื่อมต่อได้จาก IP นั้นๆ เท่านั้น

### 4.4 ทดสอบการเชื่อมต่อจาก Local

```bash
# ทดสอบจากเครื่องอื่น (ถ้า server อยู่ที่ 192.168.1.100)
mysql -h 192.168.1.100 -u wse_user -p wse

# หรือจาก public IP
mysql -h YOUR_PUBLIC_IP -u wse_user -p wse
```

---

## 5. ตั้งค่า DATABASE_URL บน Vercel

### 5.1 รูปแบบ Connection String

```
mysql://username:password@host:port/database?sslaccept=strict
```

**ตัวอย่าง:**

```
mysql://wse_user:YourStrongPassword123!@your-server-ip:3306/wse?sslaccept=strict
```

**หรือถ้าใช้ Domain:**

```
mysql://wse_user:YourStrongPassword123!@mysql.yourdomain.com:3306/wse?sslaccept=strict
```

### 5.2 URL Encoding สำหรับ Password

ถ้า password มี special characters (`@`, `#`, `%`, `&`, `+`, `=`, `?`, `/`, `:`, `;`), ต้อง encode:

**ตัวอย่าง:**
- Password: `P@ssw0rd#123`
- Encoded: `P%40ssw0rd%23123`

**วิธี Encode:**
- ใช้เว็บไซต์: https://www.urlencoder.org/
- หรือใช้ PowerShell:

```powershell
[System.Web.HttpUtility]::UrlEncode("P@ssw0rd#123")
```

### 5.3 ตั้งค่าบน Vercel Dashboard

1. ไปที่ **Vercel Dashboard** > **Project** > **Settings** > **Environment Variables**
2. เพิ่ม Variable:
   - **Key:** `DATABASE_URL`
   - **Value:** `mysql://wse_user:YourStrongPassword123!@your-server-ip:3306/wse?sslaccept=strict`
   - **Environment:** เลือก **Production**, **Preview**, และ **Development**
3. คลิก **Save**

### 5.4 Pull Environment Variables มาทดสอบ

```powershell
# Pull environment variables
vercel env pull .env.local

# ตรวจสอบ
cat .env.local | Select-String "DATABASE_URL"
```

---

## 6. ทดสอบการเชื่อมต่อ

### 6.1 ทดสอบจาก Local Machine

```powershell
# 1. Pull environment variables
vercel env pull .env.local

# 2. Generate Prisma Client
npx prisma generate

# 3. ทดสอบการเชื่อมต่อ
npx prisma db push

# 4. เปิด Prisma Studio (ถ้าสำเร็จ)
npx prisma studio
```

### 6.2 ทดสอบจาก Vercel

หลังจาก deploy แล้ว:
1. ไปที่ Vercel Dashboard > **Deployments**
2. ดู **Build Logs** ว่ามี error หรือไม่
3. ตรวจสอบ **Function Logs** ว่ามี database connection errors หรือไม่

---

## 7. Troubleshooting

### ❌ Error: "Can't reach database server"

**สาเหตุ:**
- MySQL ไม่ได้ bind ที่ `0.0.0.0`
- Firewall block port 3306
- Server IP ไม่ถูกต้อง

**แก้ไข:**
1. ตรวจสอบ `bind-address` ใน MySQL config
2. ตรวจสอบ firewall rules
3. ตรวจสอบ public IP ของ server

### ❌ Error: "Access denied for user"

**สาเหตุ:**
- Username หรือ password ผิด
- User ไม่มีสิทธิ์เชื่อมต่อจาก IP นั้น

**แก้ไข:**
```sql
-- ตรวจสอบ user
SELECT user, host FROM mysql.user;

-- ให้สิทธิ์ใหม่
GRANT ALL PRIVILEGES ON wse.* TO 'wse_user'@'%';
FLUSH PRIVILEGES;
```

### ❌ Error: "SSL connection required"

**แก้ไข:**
- เพิ่ม `?sslaccept=strict` ใน DATABASE_URL
- หรือตั้งค่า SSL บน MySQL server

### ❌ Error: "Connection timeout"

**สาเหตุ:**
- Firewall block
- MySQL ไม่ได้ฟังที่ port 3306
- Network issue

**แก้ไข:**
```bash
# ตรวจสอบว่า MySQL ฟังที่ port 3306
sudo netstat -tlnp | grep 3306

# ทดสอบ telnet
telnet YOUR_SERVER_IP 3306
```

### ❌ Error: "Too many connections"

**แก้ไข:**
```sql
-- ตรวจสอบ max connections
SHOW VARIABLES LIKE 'max_connections';

-- เพิ่ม max connections (ถ้าจำเป็น)
SET GLOBAL max_connections = 200;
```

---

## 8. Security Best Practices

### 8.1 ใช้ Strong Password

```sql
-- ใช้ password ที่ซับซ้อน
CREATE USER 'wse_user'@'%' IDENTIFIED BY 'YourStrongPassword123!@#$%';
```

### 8.2 จำกัด IP (ถ้าเป็นไปได้)

```sql
-- แทนที่จะใช้ '%' ใช้ IP เฉพาะ
CREATE USER 'wse_user'@'76.76.21.21' IDENTIFIED BY 'password';
```

### 8.3 ใช้ SSL/TLS

```sql
-- กำหนดให้ user ต้องใช้ SSL
ALTER USER 'wse_user'@'%' REQUIRE SSL;
```

### 8.4 ใช้ Firewall Rules

- จำกัด port 3306 ให้เฉพาะ IP ที่จำเป็น
- ใช้ fail2ban เพื่อป้องกัน brute force attacks

### 8.5 ใช้ Read-Only User สำหรับ Reports

```sql
-- สร้าง read-only user
CREATE USER 'wse_readonly'@'%' IDENTIFIED BY 'password';
GRANT SELECT ON wse.* TO 'wse_readonly'@'%';
FLUSH PRIVILEGES;
```

---

## 9. Checklist

- [ ] MySQL bind ที่ `0.0.0.0:3306`
- [ ] Firewall เปิด port 3306
- [ ] สร้าง database `wse`
- [ ] สร้าง user `wse_user` พร้อม password
- [ ] ให้สิทธิ์ user กับ database
- [ ] ทดสอบการเชื่อมต่อจาก local
- [ ] ตั้งค่า `DATABASE_URL` บน Vercel
- [ ] Pull environment variables
- [ ] ทดสอบ `npx prisma db push`
- [ ] Deploy และตรวจสอบ logs

---

## 10. คำสั่ง Quick Reference

```bash
# 1. แก้ไข MySQL config
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf

# 2. Restart MySQL
sudo systemctl restart mysql

# 3. เปิด Firewall
sudo ufw allow 3306/tcp

# 4. เข้า MySQL
mysql -u root -p

# 5. สร้าง Database และ User
CREATE DATABASE wse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'wse_user'@'%' IDENTIFIED BY 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON wse.* TO 'wse_user'@'%';
FLUSH PRIVILEGES;

# 6. ทดสอบการเชื่อมต่อ
mysql -h YOUR_SERVER_IP -u wse_user -p wse

# 7. Pull env และ setup
vercel env pull .env.local
npx prisma generate
npx prisma db push
```

---

## 📞 ต้องการความช่วยเหลือ?

ถ้ายังมีปัญหา:
1. ตรวจสอบ MySQL error logs: `/var/log/mysql/error.log`
2. ตรวจสอบ firewall: `sudo ufw status`
3. ทดสอบ telnet: `telnet YOUR_SERVER_IP 3306`
4. ตรวจสอบ Vercel logs ใน Dashboard
