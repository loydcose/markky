// import { authenticate } from "@/services/authService"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import dotenv from "dotenv"
dotenv.config()

// const authenticate = async (email, pass) => {
//   await new Promise((resolve) => setTimeout(resolve, 200))

//   if (email && pass) {
//     return {
//       user: {
//         email: "kingkong@gmail.com"
//       },
//       token: "123abc"
//     }
//   }
// }

export const authOptions: AuthOptions = {
  secret: "secret",
  providers: [
    GithubProvider({
      id: "github",
      name: "Github",
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      // session.accessToken = token.accessToken
      return session
    },
  },
  session: { strategy: "jwt" },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
