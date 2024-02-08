import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  id: string
  emailVerified: Date | null,
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}
