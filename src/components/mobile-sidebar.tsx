import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { NavLink } from "@/components/nav-link"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/constants/route"
import { ProfileInfo } from "@/components/profile-info"

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Icons.menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0">
        <div className="h-full">
          <SheetHeader className="text-left p-5">
            <SheetTitle className="text-2xl">Menu</SheetTitle>
          </SheetHeader>

          <Separator />

          <ProfileInfo />

          <div className="space-y-2 leading-none mt-8 px-5">
            {routes.map(route => (
              <SheetClose key={route.href} asChild>
                <NavLink href={route.href}>
                  <div className="flex flex-1 items-center gap-2 py-3">
                    <route.icon className="w-5 h-5" />
                    <span className="text-xl">{route.label}</span>
                  </div>
                </NavLink>
              </SheetClose>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
