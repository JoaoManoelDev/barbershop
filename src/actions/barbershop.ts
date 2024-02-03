"use server"

import { db } from "@/lib/db"

interface Barbershop {
  id: string
  name: string
  address: string
  image_url: string
}

export const getAllBarbershops = async () => {
  const barbershops: Barbershop[] = await db.barbershop.findMany()

  return barbershops
}