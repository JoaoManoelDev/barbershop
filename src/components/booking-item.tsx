import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  dateDayFormatter,
  dateHourAndMinutesFormatter,
  dateIsFuture,
  dateMonthFormatter
} from "@/lib/formatters"

interface BookingItemProps {
  booking: {
    barbershopName: string
    barbershopImageUrl: string
    serviceName: string
    bookingDate: Date
  }
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  const bookingConfirmed = dateIsFuture(booking.bookingDate)

  return (
    <Card>
      <CardContent className="p-5 grid grid-cols-3 py-0 pr-0">
        <div className="flex flex-col gap-2 py-5 col-span-2">
          <Badge
            className="hover:no w-fit"
            variant={bookingConfirmed ? "default" : "secondary"}
          >
            {bookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <h2 className="font-bold">{booking.serviceName}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={booking.barbershopImageUrl} className="object-cover" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="text-small">{booking.barbershopName}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center border-l">
          <p className="text-sm capitalize">{dateMonthFormatter(booking.bookingDate)}</p>
          <p className="text-2xl">{dateDayFormatter(booking.bookingDate)}</p>
          <p className="text-sm">{dateHourAndMinutesFormatter(booking.bookingDate)}</p>
        </div>
      </CardContent>
    </Card>
  )
}
