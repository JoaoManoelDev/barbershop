import Image from "next/image"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import {
  dateDayAndMonthFormatter,
  dateDayFormatter,
  dateHourAndMinutesFormatter,
  dateIsFuture,
  dateMonthFormatter,
  priceFormatter
} from "@/lib/formatters"
import { Button } from "./ui/button"
import { cancelBooking } from "@/actions/booking"

interface BookingItemProps {
  booking: {
    barbershopName: string
    barbershopImageUrl: string
    barbershopAddress: string
    serviceName: string
    servicePrice: number
    bookingDate: Date
    bookingId: string
  }
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  const isBookingConfirmed = dateIsFuture(booking.bookingDate)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Card className="min-w-full">
          <CardContent className="p-5 grid grid-cols-3 py-0 pr-0">
            <div className="flex flex-col gap-2 py-5 col-span-2">
              <Badge
                className="hover:no w-fit"
                variant={isBookingConfirmed ? "default" : "secondary"}
              >
                {isBookingConfirmed ? "Confirmado" : "Finalizado"}
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
      </SheetTrigger>

      <SheetContent className="py-0">
        <SheetHeader className="text-left py-5">
          <SheetTitle>Informações da reserva</SheetTitle>
        </SheetHeader>

        <Separator />

        <div className="space-y-5 leading-none mt-8">
          <div className="relative h-[180px] w-full">
            <Image
              src="/barbershop-map.png"
              fill
              objectFit="cover"
              alt={booking.barbershopName}
              className="rounded-lg"
            />

            <Card className="absolute left-2 right-2 bottom-5">
              <CardContent className="flex items-center p-3 gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={booking.barbershopImageUrl} className="object-cover" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>

                <div className="max-w-40 space-y-1">
                  <h2 className="font-bold">{booking.barbershopName}</h2>
                  <p className="text-xs text-muted-foreground text-ellipsis overflow-hidden text-nowrap">
                    {booking.barbershopAddress}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Badge
            className="hover:no w-fit"
            variant={isBookingConfirmed ? "default" : "secondary"}
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          <Card>
            <CardContent className="p-3 space-y-4">
              <div className="flex justify-between">
                <h2 className="font-semibold">{booking.serviceName}</h2>
                <span className="font-bold">{priceFormatter(booking.servicePrice)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm">Data</span>
                <span className="text-sm capitalize">{dateDayAndMonthFormatter(booking.bookingDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm">Horário</span>
                <span className="text-sm capitalize">{dateHourAndMinutesFormatter(booking.bookingDate)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-sm">Barbearia</span>
                <span className="text-sm capitalize">{booking.barbershopName}</span>
              </div>
            </CardContent>
          </Card>

          <SheetFooter className="flex-row w-full gap-3">
            <SheetClose>
              <Button className="w-full" variant="secondary">
                Voltar
              </Button>
            </SheetClose>

            {isBookingConfirmed && (
              <form className="w-full" action={async () => {
                "use server"
                
                await cancelBooking(booking.bookingId)
              }}>
                <Button
                  className="w-full"
                  variant="destructive"
                >
                  Cancelar reserva
                </Button>
              </form>
            )}
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}
