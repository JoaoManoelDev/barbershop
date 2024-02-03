import { Logo } from "@/components/logo"
import { MobileSidebar } from "@/components/mobile-sidebar"

export const Header = () => {
  return (
    <header
      className="h-20 flex justify-between items-center border-b lg:border-none"
    >
      <Logo />

      <MobileSidebar />
    </header>
  )
}
