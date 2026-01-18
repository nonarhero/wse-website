import type { Metadata } from 'next'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import SessionProvider from '@/components/providers/SessionProvider'
import { TrackingScripts, TrackingBodyScripts } from '@/components/TrackingScripts'

export const metadata: Metadata = {
  title: 'Wall Street English Thailand - เรียนภาษาอังกฤษกับสถาบันระดับโลก',
  description: 'เรียนภาษาอังกฤษกับ Wall Street English วิธี Multimethod® ที่ได้รับการพิสูจน์แล้ว หลักสูตรยืดหยุ่นทั้งออนไลน์และในโรงเรียน',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>
        <TrackingScripts />
        <TrackingBodyScripts />
        <SessionProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </SessionProvider>
      </body>
    </html>
  )
}
