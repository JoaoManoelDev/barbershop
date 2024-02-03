import { Icons } from "@/components/icons"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link
      href="/"
      className="text-2xl font-bold font-kalam tracking-tighter flex gap-1"
    >
      <Icons.scissors className="w-7 h-7" />
      <span>Barbershop</span>
    </Link>
  )
}
