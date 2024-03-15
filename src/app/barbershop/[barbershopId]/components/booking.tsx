"use client"

import { useEffect, useMemo, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { ptBR } from "date-fns/locale"
import { setHours, setMinutes } from "date-fns"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Icons } from "@/components/icons"
import { getDayBookings, saveBooking } from "@/actions/booking"
import { dateDayAndMonthFormatter, priceFormatter } from "@/lib/formatters"
import { generateDayTimeList } from "../helpers/hours"

interface BookingItemProps {
  service: {
    id: string
    name: string
    price: number
    description: string
    imageUrl: string
    barbershopName: string
    barbershopId: string
  }
}

interface Booking {
  id: string
  user_id: string
  service_id: string
  date: Date
  barbershop_id: string
}

export const Booking = ({ service }: BookingItemProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hour, setHour] = useState<string | undefined>()
  const [submitIsLoading, setSubmitIsLoading] = useState(false)
  const [sheetIsOpen, setSheetIsOpen] = useState(false)
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const router = useRouter()
  const { data } = useSession() 

  useEffect(() => {
    if (!date) return

    const refreshAvailableHours = async () => {
      const allDayBookings = await getDayBookings(date, service.barbershopId)
      setDayBookings(allDayBookings)
    }

    refreshAvailableHours()
  }, [date, service])

  const handleSubmitBooking = async () => {
    if (!date || !hour || !data) return

    try {
      setSubmitIsLoading(true)
      const dateHour = Number(hour.split(":")[0])
      const dateMinutes = Number(hour.split(":")[1])

      const formattedDate = setMinutes(setHours(date, dateHour), dateMinutes)

      await saveBooking({
        barbershopId: service.barbershopId,
        serviceId: service.id,
        date: formattedDate,
        userId: data?.user.id,
      })

      setSheetIsOpen(false)
      setDate(undefined)
      setHour(undefined)
      toast.success("Reserva realizada com sucesso.", {
        description: `${dateDayAndMonthFormatter(formattedDate)}`,
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings")
        }
      })
    } catch {
      toast.error("Algo deu errado, tente novamente mais tarde.")
    } finally {
      setSubmitIsLoading(false)
    }
  }

  const handleDateClick = (date: Date | undefined) => {
    setDate(date)
    setHour(undefined)
  }

  const handleHourClick = (time: string) => setHour(time)

  const timeList = useMemo(() => {
    if (!date) return []

    return generateDayTimeList(date).filter((time) => {
      const timeHour = Number(time.split(":")[0])
      const timeMinutes = Number(time.split(":")[1])

      const booking = dayBookings.find((booking) => {
        const bookingHour = booking.date.getHours()
        const bookingMinutes = booking.date.getMinutes()

        return bookingHour === timeHour && bookingMinutes === timeMinutes
      })

      if (!booking) return true

      return false
    })
  }, [date, dayBookings])

  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button size="sm" variant="secondary">Agendar</Button>
      </SheetTrigger>

      <SheetContent className="p-0 overflow-auto pb-6">
        <SheetHeader className="text-left px-5 py-6">
          <SheetTitle>Fazer reserva</SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          <Separator />

          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateClick}
            locale={ptBR}
            fromDate={new Date()}
            styles={{
              caption: { textTransform: "capitalize" },
              head_cell: { textTransform: "capitalize" }
            }}
          />

          <Separator />

          {/* TODO: Mostrar lista de horários apenas se uma
          data estiver selecionada de forma personalizada */}

          {date ? (
            <div
              className="px-3 flex overflow-auto gap-2 [&::-webkit-scrollbar]:hidden"
            >
              {timeList.map(time => (
                <Button
                  key={time}
                  variant={hour === time ? 'default' : "outline"}
                  className="rounded-full"
                  onClick={() => handleHourClick(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          ) : (
            <p className="px-4 gap-2 flex items-center justify-center">
              <Icons.arrowUp className="w-4 h-4" />
              <span>Selecione uma data</span>
              <Icons.arrowUp className="w-4 h-4" />
            </p>
          )}

          {date && hour && (
            <div className="px-3 flex flex-col gap-4">
              <Card>
                <CardContent className="p-3 space-y-4">
                  <div className="flex justify-between">
                    <h2 className="font-semibold">{service.name}</h2>
                    <span className="font-bold">{priceFormatter(service.price)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Data</span>
                    <span className="text-sm capitalize">{dateDayAndMonthFormatter(date)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Horário</span>
                    <span className="text-sm capitalize">{hour}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm">Barbearia</span>
                    <span className="text-sm capitalize">{service.barbershopName}</span>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Button
                  className="w-full"
                  onClick={handleSubmitBooking}
                  disabled={submitIsLoading}
                >
                  {submitIsLoading ? (
                    <>
                      <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                      <span>Confirmando...</span>
                    </>
                  ) : "Confirmar reserva"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>

    </Sheet>
  )
}
