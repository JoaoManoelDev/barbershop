"use server"

import { db } from "@/lib/db"

interface Services {
  id: string
  name: string
  price: number
  description: string
  image_url: string
  barbershop_id: string
}

interface Barbershop {
  id: string
  name: string
  address: string
  image_url: string
  services: Services[]
}

export const getAllBarbershops = async (): Promise<Barbershop[]> => {
  const barbershops = await db.barbershop.findMany()

  return barbershops
}

interface GetBarbershopByIdProps {
  barbershopId: string,
  includeServices?: boolean
}

export const getBarbershopById = async ({
  barbershopId,
  includeServices = false
}: GetBarbershopByIdProps): Promise<Barbershop> => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: barbershopId
    },
    include: {
      services: includeServices
    }
  })

  return barbershop
}