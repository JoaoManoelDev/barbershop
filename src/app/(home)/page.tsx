import { SearchBarber } from "./components/search-barber"
import { Welcome } from "./components/welcome"
import { BarbershopItem } from "./components/barbershop-item"
import { Header } from "@/components/header"
import { BookingItem } from "@/components/booking-item"
import { Icons } from "@/components/icons"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

import { getAllBarbershops } from "@/actions/barbershop"
import { getBookingsByUserIdWithBarbershopAndService } from "@/actions/booking"
import { auth } from "@/auth"
import { dateIsFuture } from "@/lib/formatters"

const Home = async () => {
  const session = await auth()

  const [barbershops, bookings] = await Promise.all([
    await getAllBarbershops(),
    session
      ? await getBookingsByUserIdWithBarbershopAndService(session?.user.id)
      : Promise.resolve([])
  ])

  const confirmedBookings = bookings.filter(booking => dateIsFuture(booking.date))

  return (
    <div className="max-w-6xl mx-auto container mb-4">
      <Header />

      <div className="space-y-6 py-5 ">
        <Welcome />

        <SearchBarber />

        <div className="gap-2">
          <div className="flex gap-2 items-center mb-3">
            <p className="text-xs uppercase font-bold text-muted-foreground ">
              Agendamentos
            </p>
            <Icons.arrowRight className="w-4 h-4" />
          </div>

          <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {confirmedBookings.length >= 1 ? (
              confirmedBookings.map(booking => (
                <BookingItem key={booking.id} booking={{
                  barbershopName: booking.barbershop.name,
                  serviceName: booking.service.name,
                  servicePrice: booking.service.price,
                  bookingDate: booking.date,
                  bookingId: booking.id,
                  barbershopImageUrl: booking.barbershop.image_url,
                  barbershopAddress: booking.barbershop.address
                }} />
              ))
            ) : (
              <span>Nenhum agendamento feito.</span>
            )}
          </div>
        </div>

        <div>
          <div className="flex gap-2 items-center mb-3">
            <p className="text-xs uppercase font-bold text-muted-foreground" >
              Recomendados
            </p>
            <Icons.arrowRight className="w-4 h-4" />
          </div>

          <Carousel>
            <CarouselContent className="gap-4">
              {barbershops?.map((barbershop) => (
                 <CarouselItem key={barbershop.id} className="min-w-[192px] max-w-[192px]">

                  <BarbershopItem
                    key={barbershop.id}
                    barbershop={{
                      ...barbershop,
                      imageUrl: barbershop.image_url
                    }}
                  />
                
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex" />
            <CarouselNext className="hidden xl:flex" />
          </Carousel>
        </div>

        <div>
          <div className="flex gap-2 items-center mb-3">
            <p className="text-xs uppercase font-bold text-muted-foreground ">
              Populares
            </p>
            <Icons.arrowRight className="w-4 h-4" />
          </div>

          <Carousel>
            <CarouselContent className="gap-4">
              {barbershops?.map((barbershop) => (
                 <CarouselItem
                  key={barbershop.id}
                  className="min-w-[192px] max-w-[192px]"
                >
                  <BarbershopItem
                    key={barbershop.id}
                    barbershop={{
                      ...barbershop,
                      imageUrl: barbershop.image_url
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden xl:flex" />
            <CarouselNext className="hidden xl:flex" /> 
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Home
