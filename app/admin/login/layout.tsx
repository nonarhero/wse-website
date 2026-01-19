export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Login page doesn't need AdminLayout, just render children
  return <>{children}</>
}
