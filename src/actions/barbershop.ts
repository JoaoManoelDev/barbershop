"use server"

import { db } from "@/lib/db"

export const getAllBarbershops = async () => {
  const barbershops = await db.barbershop.findMany()

  if (!barbershops) return []

  return barbershops
}

export const getBarbershopById = async (barbershopId: string) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: barbershopId
    },
    include: {
      services: true
    }
  })

  if (!barbershop) return null

  return barbershop
}