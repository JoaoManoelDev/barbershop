import { SearchBarber } from "./components/search-barber"
import { Welcome } from "./components/welcome"
import { Header } from "@/components/header"
import { BookingItem } from "@/components/booking-item"

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto container">
      <Header />

      <div className="space-y-6 py-5 ">
        <Welcome />
        <SearchBarber />
        <div className="gap-2">
          <p className="text-xs uppercase font-bold text-muted-foreground mb-3">Agendamentos</p>
          <BookingItem />
        </div>
      </div>
    </div>
  )
}

export default Home
