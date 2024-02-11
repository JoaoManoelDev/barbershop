import * as React from "react"
import { VariantProps } from "class-variance-authority"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { NavLink } from "@/components/nav-link"
import { Separator } from "@/components/ui/separator"
import { routes } from "@/constants/route"
import { ProfileInfo } from "@/components/profile-info"
import { cn } from "@/lib/utils"

interface MobileSidebarProps extends React.HtmlHTMLAttributes<HTMLDivElement>,
  VariantProps<typeof buttonVariants> {}

export const MobileSidebar = ({ className, variant, size }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className={cn("lg:hidden", className)}
          variant={variant}
          size={size}
        >
          <Icons.menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="p-0">
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
                  <div className="flex flex-1 items-end gap-2 py-2 cursor-pointer">
                    <route.icon className="w-5 h-5" />
                    <span className="text-md">{route.label}</span>
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
