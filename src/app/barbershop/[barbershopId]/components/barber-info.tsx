import Image from "next/image"
import Link from "next/link"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MobileSidebar } from "@/components/mobile-sidebar"

interface HeaderProps {
  barbershop: {
    id: string
    name: string
    address: string
    imageUrl: string
  }
}

export const BarberInfo = ({ barbershop }: HeaderProps) => {
  return (
    <header>
      <div className="h-60 relative">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "outline", size: "icon" }), "absolute top-4 left-4 z-50" )}
        >
          <Icons.chevronLeft />
        </Link>

        <MobileSidebar
          className="absolute top-4 right-4 z-50"
          size="icon"
          variant="outline"
        />

        <Image
          src={barbershop.imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full opacity-75"
          style={{ objectFit: "cover" }}
          alt={barbershop.name}
        />
      </div>

      <div className="px-5 py-3 space-y-2">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="flex items-center gap-2 ">
          <Icons.mapPin className="w-4 h-4" />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="flex items-center gap-2 ">
          <Icons.star className="w-4 h-4 fill-yellow-300 text-yellow-300" />
          <p className="text-sm">5,0 (392 avaliações)</p>
        </div>
      </div>
    </header>
  )
}
