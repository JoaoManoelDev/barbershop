import { Roboto, Kalam } from "next/font/google"

export const kalam = Kalam({
  weight: "700",
  subsets: ["latin"],
  variable: "--kalam",
})

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto"
})