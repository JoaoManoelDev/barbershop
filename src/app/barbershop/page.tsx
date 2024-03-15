import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Header } from "@/components/header"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { db } from "@/lib/db"
import { cn } from "@/lib/utils"

interface BarbershopProps {
  searchParams: {
    search: string
  }
}

const BarbershopPage = async ({
  searchParams
}: BarbershopProps) => {
  if (!searchParams.search) redirect("/")

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive"
      }
    },
  })

  return (
    <div className="max-w-6xl mx-auto container mb-4">
      <Header />

      <div className="grid grid-cols-2 gap-3 mt-4">
        {barbershops.map(barbershop => (
          <Card className="rounded-xl flex flex-col justify-between items-center">
            <CardContent className="h-full p-0 relative">
              <Badge className="absolute top-2 left-2 z-50 opacity-90">
                <div className="flex items-center gap-1">
                  <Icons.star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  <span className="w-4 h-4">5,0</span>
                </div>
              </Badge>

              <Image
                  src={barbershop.image_url}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-[159px] rounded-xl"
                  style={{ objectFit: "cover" }}
                  alt={barbershop.name}
                />

              <div className="p-2 max-w-40">
                <h2 className="font.bold">{barbershop.name}</h2>
                <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden text-nowrap">{barbershop.address}</p>
              </div>
            </CardContent>
            <CardFooter className="mt-auto py-3 px-2 w-full">
              <Link
                href={`/barbershop/${barbershop.id}`}
                className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
              >
                Reservar
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
