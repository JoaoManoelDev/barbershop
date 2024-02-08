import { auth } from "@/auth"
import { dateFormatter } from "@/lib/formatters"

export const Welcome = async () => {
  const session = await auth()
        
  return (
    <div className="gap-1">
      <h2 className="text-xl font-bold">Olá, {session ? session?.user.name : "Anônimo"}</h2>
      <p className="text-sm capitalize">
        {dateFormatter(new Date())}
      </p>
    </div>
  )
}
