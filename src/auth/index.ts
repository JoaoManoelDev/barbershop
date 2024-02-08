import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { authConfig } from "./config"
import { db } from "@/lib/db"
import { getUserById } from "@/actions/user"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut  
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() }
      })
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (!token.sub) return token

      const existingUser = await getUserById(token.sub)

      if (!existingUser) return token

      return { ...user, ...token }
    },

    async session({ session, token }) {
      if (token.sub) session.user.id = token.sub
      
      return session
    }
  },

  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})