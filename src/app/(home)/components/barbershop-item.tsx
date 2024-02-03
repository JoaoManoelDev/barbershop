import Image from "next/image"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"

interface BarbershopItem {
  barbershop: {
    id: string
    name: string
    address: string
    imageUrl: string
  }
}

export const BarbershopItem = ({ barbershop }: BarbershopItem) => {
  return (
    <Card className="min-w-[192px] max-w-[192px] rounded-xl flex flex-col justify-between items-center">
      <CardContent className="h-full p-0 relative">
        <Badge className="absolute top-2 left-2 z-50 opacity-90">
          <div className="flex items-center gap-1">
            <Icons.star className="w-3 h-3 fill-yellow-300 text-yellow-300" />
            <span className="w-4 h-4">5,0</span>
          </div>
        </Badge>
        <Image
          src={barbershop.imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-[159px] rounded-xl"
          style={{ objectFit: "cover" }}
          alt={barbershop.name}
        />

        <div className="p-2 max-w-44">
          <h2 className="font.bold">{barbershop.name}</h2>
          <p className="text-sm text-muted-foreground text-ellipsis overflow-hidden text-nowrap">{barbershop.address}</p>
        </div>
      </CardContent>
      <CardFooter className="mt-auto py-3 px-2 w-full">
        <Button className=" w-full">Reservar</Button>
      </CardFooter>
    </Card>
  )
}
