import { Header } from "@/components/header"
import { BookingItem } from "@/components/booking-item"
import { auth } from "@/auth"
import {
  getBookingsByUserIdWithBarbershopAndService
} from "@/actions/booking"
import { dateIsFuture, dateIsPast } from "@/lib/formatters"

const BookingsPage = async () => {
  const session = await auth()

  const bookings = await getBookingsByUserIdWithBarbershopAndService(session?.user.id!)

  const confirmedBookings = bookings.filter(booking => dateIsFuture(booking.date))
  const finishedBookings = bookings.filter(booking => dateIsPast(booking.date))

  return (
    <div className="max-w-6xl mx-auto container mb-16">
      <Header />

      <div className="space-y-6 py-5 ">
        <h1 className="text-xl font-bold">Agendamentos</h1>

        <div className="gap-2">
          <p className="text-xs uppercase font-bold text-muted-foreground mb-3">
            Confirmados
          </p>

          <div className="flex flex-col gap-2">
            {confirmedBookings.length >= 1 ? (
              confirmedBookings.map(booking => (
                <BookingItem booking={{
                  barbershopName: booking.barbershop.name,
                  serviceName: booking.service.name,
                  bookingDate: booking.date,
                  barbershopImageUrl: booking.barbershop.image_url
                }} />
              ))
            ) : (
              <span>Nenhum agendamento feito.</span>
            )}
          </div>
        </div>

        <div className="gap-2">
          <p className="text-xs uppercase font-bold text-muted-foreground mb-3">
            Finalizados
          </p>

          <div className="flex flex-col gap-2">
            {finishedBookings.length >= 1 ? (
              finishedBookings.map(booking => (
                <BookingItem booking={{
                  barbershopName: booking.barbershop.name,
                  serviceName: booking.service.name,
                  bookingDate: booking.date,
                  barbershopImageUrl: booking.barbershop.image_url
                }} />
              ))
            ) : (
              <span>Nenhum agendamento finalizado.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingsPage
