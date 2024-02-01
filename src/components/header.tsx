import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"

export const Header = () => {
  return (
    <header
      className="container h-20 flex justify-between items-center"
    >
      <Logo />

      <Button variant="outline" size="iconSm">
        <Icons.menu className="w-5 h-5" />
      </Button>
    </header>
  )
}
