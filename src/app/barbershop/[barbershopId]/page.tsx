import { BarberInfo } from "./components/barber-info"
import { ServiceItem } from "./components/service-item"
import { Separator } from "@/components/ui/separator"
import { getBarbershopById } from "@/actions/barbershop"

interface BarbershopDetailsPageProps {
  params: {
    barbershopId: string
  }
}

const BarbershopDetailsPage = async ({
  params
}: BarbershopDetailsPageProps) => {
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
      <BarberInfo barbershop={{ ...barbershop, imageUrl: barbershop.image_url }} />

      <Separator />

      <section className="container space-y-2">
        {barbershop.services.map(service => (
          <ServiceItem key={service.id} service={{
            ...service,
            imageUrl: service.image_url,
            barbershopName: barbershop.name
          }} />
        ))}
      </section>
    </div>
  )
}

export default BarbershopDetailsPage
