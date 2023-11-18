import { getUser, getUserNotes } from "@/actions";
import Home from "./home";

export default async function page() {
  // get the id from the next-auth
  // use that id to find his notes on our db
  ``
  const userId = "6558800306d6e174cda3a524"
  const user = await getUser(userId) 
  const userNotes = await getUserNotes(userId) 

  console.log({user, userNotes})

  return <Home/>
}