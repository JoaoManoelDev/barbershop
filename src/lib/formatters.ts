import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateFormatter = (date: Date) => format(date, "EEEE',' dd 'de' MMMM", { locale: ptBR })

export const dateDayAndMonthFormatter = (date: Date) => format(date, "dd 'de' MMMM", { locale: ptBR })

export const priceFormatter = (price: number) => {
  const priceFormatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(price)

  return priceFormatted
}