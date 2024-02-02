import { dateFormatter } from "@/lib/formatters"

export const Welcome = () => {
  return (
    <div className="gap-1">
      <h2 className="text-xl font-bold font-roboto">Olá, João</h2>
      <p className="text-sm capitalize">
        {dateFormatter(new Date())}
      </p>
    </div>
  )
}
