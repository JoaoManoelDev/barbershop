import { Icons } from "@/components/icons"

export const Logo = () => {
  return (
    <div className="text-2xl font-bold font-kalam tracking-tighter flex  gap-1">
      <Icons.scissors className="w-7 h-7" />
      <span>Barbershop</span>
    </div>
  )
}
