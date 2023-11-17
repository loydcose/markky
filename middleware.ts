import { withAuth } from "next-auth/middleware"

// docs: https://next-auth.js.org/configuration/nextjs

export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: "/auth",
  },
})

export const config = { matcher: ["/"] }
