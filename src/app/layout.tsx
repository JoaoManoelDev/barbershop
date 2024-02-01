import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "@/styles/globals.css"
import { kalam, roboto } from "@/styles/fonts"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Barber Shop",
  description: "Sistema de barbearia",
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html
      lang="pt-br"
      className={`${roboto.variable} ${kalam.variable} font-roboto`}
    >
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout
