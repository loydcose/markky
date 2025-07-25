import { getServerSession } from "next-auth"
import Auth from "./auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/authOptions"

export default async function page() {
  const session = await getServerSession(authOptions)
  if (session) {
    redirect("/")
  }

  return <Auth />
}
