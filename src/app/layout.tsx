import type { Metadata } from "next"

import "@/styles/globals.css"
import { kalam, roboto } from "@/styles/fonts"
import { Toaster } from "@/components/ui/sonner"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Barbershop",
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
      className={`${roboto.variable} ${kalam.variable} font-roboto dark`}
    >
      <body>
        <div className="flex flex-col justify-between h-full">
          {children}
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  )
}

export default RootLayout
