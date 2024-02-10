import { SessionProvider } from "next-auth/react"

import { BarberInfo } from "./components/barber-info"
import { ServiceItem } from "./components/service-item"
import { Separator } from "@/components/ui/separator"
import { getBarbershopById } from "@/actions/barbershop"
import { auth } from "@/auth"

interface BarbershopDetailsPageProps {
  params: {
    barbershopId: string
  }
}

const BarbershopDetailsPage = async ({
  params
}: BarbershopDetailsPageProps) => {
  const session = await auth()
  const barbershop = await getBarbershopById(params.barbershopId)

  if (!barbershop) {
    return (
      <div className="p-5">
        <p>Informações não disponíveis</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 max-w-6xl mx-auto mb-16">
      <SessionProvider session={session}>
        <BarberInfo barbershop={{ ...barbershop, imageUrl: barbershop.image_url }} />

        <Separator />

        <section className="container space-y-2">
          {barbershop.services.map(service => (
            <ServiceItem key={service.id} service={{
              ...service,
              imageUrl: service.image_url,
              barbershopId: service.barbershop_id,
              barbershopName: barbershop.name
            }} />
          ))}
        </section>
      </SessionProvider>
    </div>
  )
}

export default BarbershopDetailsPage
