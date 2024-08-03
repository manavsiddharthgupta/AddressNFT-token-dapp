import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/app/components/providers'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'This is just a sample dashboard'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <Providers>{children}</Providers>
    </html>
  )
}
