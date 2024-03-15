import { redirect } from "next/navigation"

import { Header } from "@/components/header"
import { BarbershopItem } from "@/app/(home)/components/barbershop-item"
import { db } from "@/lib/db"

interface BarbershopProps {
  searchParams: {
    search: string
  }
}

const BarbershopPage = async ({
  searchParams
}: BarbershopProps) => {
  if (!searchParams.search) redirect("/")

  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams.search,
        mode: "insensitive"
      }
    },
  })

  return (
    <div className="max-w-6xl mx-auto container mb-4">
      <Header />

      <h1
       className="mb-4 text-lg"
      >
        Resultados para {" "}
        <span className="font-bold">{`"${searchParams.search}"`}</span>
      </h1>

      <div className="flex gap-4 flex-wrap">
        {barbershops.map(barbershop => (
          <BarbershopItem
          key={barbershop.id}
          barbershop={{
            ...barbershop,
            imageUrl: barbershop.image_url
          }}
        />
        ))}
      </div>
    </div>
  )
}

export default BarbershopPage
