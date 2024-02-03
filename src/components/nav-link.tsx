"use client"

import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"

interface NavLinkProps extends LinkProps {
  children: React.ReactNode
}

export function NavLink(props: NavLinkProps) {
  const pathname = usePathname()

  return (
    <Link
      data-current={pathname === props.href}
      className="flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground data-[current=true]:text-foreground"
      {...props}
    >
      {props.children}
    </Link>
  )
}
