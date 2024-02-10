import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from "@/components/ui/avatar"

interface BookingItemProps {
  booking: {
    barbershopName: string
    serviceName: string
  }
}

export const BookingItem = ({ booking }: BookingItemProps) => {
  return (
    <Card>
      <CardContent className="p-5 grid grid-cols-3 py-0 pr-0">
        <div className="flex flex-col gap-2 py-5 col-span-2">
          <Badge className="hover:bg-primary w-fit">Confirmado</Badge>

          <h2 className="font-bold">{booking.serviceName}</h2>

          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <span className="text-small">{booking.barbershopName}</span>
          </div>
        </div>

        <div className="flex flex-col justify-center items-center border-l">
          <p className="text-sm">Fevereiro</p>
          <p className="text-2xl">06</p>
          <p className="text-sm">17:45</p>
        </div>
      </CardContent>
    </Card>
  )
}
