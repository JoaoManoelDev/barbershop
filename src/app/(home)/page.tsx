import { SearchBarber } from "./components/search-barber"
import { Welcome } from "./components/welcome"
import { BarbershopItem } from "./components/barbershop-item"
import { Header } from "@/components/header"
import { BookingItem } from "@/components/booking-item"
import { Icons } from "@/components/icons"

import { getAllBarbershops } from "@/actions/barbershop"

const Home = async () => {
  const barbershops = await getAllBarbershops()

  return (
    <div className="max-w-6xl mx-auto container mb-16">
      <Header />

      <div className="space-y-6 py-5 ">
        <Welcome />

        <SearchBarber />

        <div className="gap-2">
          <p className="text-xs uppercase font-bold text-muted-foreground mb-3">Agendamentos</p>
          <BookingItem />
        </div>

        <div>
          <div className="flex gap-2 items-center mb-3">
            <p className="text-xs uppercase font-bold text-muted-foreground ">Recomendados</p>
            <Icons.arrowRight className="w-4 h-4" />
          </div>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops?.map((barbershop) => {
              return (
                <BarbershopItem
                  key={barbershop.id}
                  barbershop={{
                      ...barbershop,
                      imageUrl: barbershop.image_url
                    }}
                />
              )
            })}
          </div>
        </div>


        <div>
          <div className="flex gap-2 items-center mb-3">
            <p className="text-xs uppercase font-bold text-muted-foreground ">Populares</p>
            <Icons.arrowRight className="w-4 h-4" />
          </div>

          <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
            {barbershops?.map((barbershop) => {
              return (
                <BarbershopItem
                  key={barbershop.id}
                  barbershop={{
                      ...barbershop,
                      imageUrl: barbershop.image_url
                    }}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
