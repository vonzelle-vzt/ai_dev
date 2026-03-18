import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Dev Shop — Your AI Engineering Team",
  description: "Submit a brief. We architect, build, test, and deploy. $99/month.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-zinc-950 text-zinc-50`}>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
