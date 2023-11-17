import type { Metadata } from "next"
import { Inter, Noto_Sans_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })
const notoSansMono = Noto_Sans_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Markky",
  description: "A markdown notes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={notoSansMono.className + " min-h-screen bg-white dark:bg-zinc-900 text-sm md:text-base font-medium"}>{children}</body>
    </html>
  )
}
