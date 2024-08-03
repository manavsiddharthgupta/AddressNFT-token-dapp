'use client'
import { ThemeProvider } from '@/app/components/theme-provider'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className={inter.className + ' min-h-screen'}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
        <Toaster />
      </ThemeProvider>
    </body>
  )
}

export default Providers