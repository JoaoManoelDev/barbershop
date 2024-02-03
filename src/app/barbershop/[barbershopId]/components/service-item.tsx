import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceItemProps {
  service: {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    barbershop_id: string
  }
}

export const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className="flex items-center p-3 gap-4">
        <div className="min-w-24 min-h-24 max-w-24 max-h-24">
          <Image
            src={service.imageUrl}
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-full"
            style={{ objectFit: "cover" }}
            alt={service.name}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="font-bold text-sm">{service.name}</h2>
          <p className="text-sm text-muted-foreground">{service.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold">R$ {service.price}</span>
            <Button size="sm" variant="secondary">Agendar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
