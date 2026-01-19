# 🔧 แก้ไขหน้า Admin Login ขาว (Blank Page)

## ❌ ปัญหา

หน้า `/admin/login` เป็นหน้าขาว (blank page) ไม่มีฟอร์มล็อกอิน

**สาเหตุ:** `app/admin/layout.tsx` ใช้ `useSession()` และ return `null` เมื่อไม่มี session

```tsx
// app/admin/layout.tsx
if (!session) {
  return null  // ← นี่ทำให้หน้า /admin/login เป็น blank!
}
```

เมื่อเข้าหน้า `/admin/login` ซึ่งอยู่ภายใต้ `/admin` route:
1. `app/admin/layout.tsx` ทำงาน
2. `useSession()` ไม่มี session
3. Return `null` → หน้าเป็น blank

---

## ✅ วิธีแก้ไข

### สร้าง `app/admin/login/layout.tsx`

สร้าง layout พิเศษสำหรับหน้า login ที่ไม่ใช้ `AdminLayout`:

```tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page doesn't need AdminLayout, just render children
  return <>{children}</>
}
```

ไฟล์นี้จะ override `app/admin/layout.tsx` สำหรับหน้า `/admin/login` เท่านั้น

---

## 📋 Checklist

- [x] สร้าง `app/admin/login/layout.tsx`
- [ ] Redeploy บน Vercel
- [ ] ทดสอบ: https://wse-website.vercel.app/admin/login (ควรแสดงฟอร์มล็อกอิน)

---

## 🚀 หลังแก้ไข

**Commit และ Push:**

```powershell
git add app/admin/login/layout.tsx
git commit -m "Fix: Add layout for admin login page to prevent blank page"
git push
```

**หรือ Redeploy บน Vercel:**

- Vercel Dashboard > Deployments > Redeploy

---

**เสร็จแล้ว!** 🎉
