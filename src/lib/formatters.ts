import { format, isFuture, isPast } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateFormatter = (date: Date) => format(date, "EEEE',' dd 'de' MMMM", { locale: ptBR })

export const dateDayAndMonthFormatter = (date: Date) => format(date, "dd 'de' MMMM", { locale: ptBR })

export const dateMonthFormatter = (date: Date) => format(date, "MMMM", { locale: ptBR })

export const dateDayFormatter = (date: Date) => format(date, "dd")

export const dateHourAndMinutesFormatter = (date: Date) => format(date, "hh:mm")

export const dateIsFuture = (date: Date) => isFuture(date)

export const dateIsPast = (date: Date) => isPast(date)

export const priceFormatter = (price: number) => {
  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price)

  return priceFormatted
}