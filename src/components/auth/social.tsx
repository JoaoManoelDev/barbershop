"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"
import { useSearchParams } from "next/navigation"

export const Social = () => {
  const searchParams = useSearchParams().get("callbackUrl")

  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: searchParams || DEFAULT_LOGIN_REDIRECT,
      redirect: true
    })
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onClick("google")}
      >
        <Icons.google className="w-5 h-5" />
      </Button>
    </div>
  )
}
