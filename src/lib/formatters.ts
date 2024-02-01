import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export const dateFormatter = (date: Date) => format(date, "EEEE',' dd 'de' MMMM", { locale: ptBR })
