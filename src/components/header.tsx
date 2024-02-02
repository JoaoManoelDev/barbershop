import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"

export const Header = () => {
  return (
    <header
      className="h-20 flex justify-between items-center border-b lg:border-none"
    >
      <Logo />

      <Button variant="outline" size="iconSm">
        <Icons.menu className="w-5 h-5" />
      </Button>
    </header>
  )
}
