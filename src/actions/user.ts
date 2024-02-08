import { db } from "@/lib/db"

export const getUserByEmail = async (email: string) => {

  const user = db.user.findUnique({ where: { email } })

  if (!user) return []

  return user

}

export const getUserById = async (id: string) => {
  const user = db.user.findUnique({ where: { id } })

  if (!user) return []

  return user
}