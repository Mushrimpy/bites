import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { MobileNavigation } from "@/components/mobile-navigation"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Investment Banking CRM</title>
        <meta name="description" content="A CRM application for investment bankers" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="flex min-h-screen flex-col bg-background">
          <main className="flex-1">
            {children}
          </main>
          <MobileNavigation />
        </div>
      </body>
    </html>
  )
}
