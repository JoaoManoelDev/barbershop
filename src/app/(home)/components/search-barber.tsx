import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export const SearchBarber = () => {
  return (
    <div className="flex items-center gap-2">
      <Input placeholder="Busque por uma barbearia" />
      <Button size="icon">
        <Icons.search className="w-4 h-4" />
      </Button>
    </div>
  )
}
