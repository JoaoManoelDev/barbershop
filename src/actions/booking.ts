"use server"

import { endOfDay, startOfDay } from "date-fns"

import { db } from "@/lib/db"

export const getBookingsByUserIdWithBarbershopAndService = async (userId: string) => {
  const bookings = await db.booking.findMany({
    where: {
      user_id: userId
    },
    include: {
      barbershop: true,
      service: true
    }
  })

  if (bookings.length < 0) return []

  return bookings
}

export const getDayBookings = async (date: Date, barbershopId: string) => {
  const bookings = await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date)
      },
      barbershop_id: barbershopId
    }
  })

  return bookings
}

interface saveBookingProps {
  barbershopId: string
  serviceId: string
  userId: string
  date: Date
}

export const saveBooking = async ({
  barbershopId,
  serviceId,
  userId,
  date
}: saveBookingProps) => {
  await db.booking.create({
    data: {
      barbershop_id: barbershopId,
      service_id: serviceId,
      user_id: userId,
      date      
    }
  })
}