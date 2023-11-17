import { getServerSession } from "next-auth"
import Auth from "./auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function page() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }

  return <Auth />
}
