import { getUser, getUserNotes } from "@/actions"
import Home from "./home"
import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]/route"
import { User } from "@/database/models/user"
import { Note } from "@/database/models/notes"
import dbConnect from "@/database/db-connect"

export default async function page() {
  // get email from next-auth example: "user1@gmail.com"
  // if that email is exist on the db, get its collection
  // if not, create a new one
  // use that id to find his notes on our db
  const session = await getServerSession(authOptions)
  await dbConnect()
  const sessionUser = session?.user
  let user = await User.findOne({ email: sessionUser?.email })
  if (!user) {
    user = await User.create({
      email: sessionUser?.email,
      name: sessionUser?.name,
    })
  }
  const userNotes = await Note.find({ ownerId: user._id.toString() });

  console.log({user, userNotes})

  return <Home initUser={user} initUserNotes={userNotes}/>
}
