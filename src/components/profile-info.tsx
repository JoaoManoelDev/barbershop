import Link from "next/link"

import { auth, signOut } from "@/auth"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

export const ProfileInfo = async () => {
  const session = await auth()

  return (
    <div className="flex justify-between items-center mt-4 px-5">
      {session?.user.id ? (
        <>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={session.user.image || undefined} /> 
              <AvatarFallback>{session.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <h2 className="font-bold">{session.user.name}</h2>
          </div>

          <form action={async () => {
            "use server"

            await signOut()
          }}>
            <Button size="iconSm" variant="outline">
              <Icons.logOut className="w-4 h-4" />
            </Button>
          </form>
        </>
      ): (
        <div className="space-y-4 w-full">
          <div className="flex items-center gap-2">
            <Icons.userCircle className="w-10 h-10" />
            <span className="font-bold">Olá, faça o seu login</span>
          </div>

          <Link
            href="/auth/login"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "flex items-center w-full gap-2")}
          >
            <Icons.logIn className="w-4 h-4" />
            <span>Entrar</span>
          </Link>
        </div>
      )}
    </div>
  )
}
