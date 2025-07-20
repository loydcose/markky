import V2 from "./v2";
import { getUser, getUserNotes } from "@/actions";
import { getServerSession } from "next-auth";
import { User } from "@/database/models/user";
import { Note } from "@/database/models/notes";
import dbConnect from "@/database/db-connect";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { Editor } from "@/database/models/editor";

export default async function page() {
  const session = await getServerSession(authOptions);
  await dbConnect();
  const sessionUser = session?.user;
  let user = await User.findOne({ email: sessionUser?.email });
  if (!user) {
    user = await User.create({
      email: sessionUser?.email,
      name: sessionUser?.name,
    });
  }
  const userEditors = await Editor.find({ ownerId: user._id.toString() });

  console.log({ user, userEditors });
  return (
    <>
      <V2 initUser={user} initUserEditors={userEditors}/>
    </>
  );
}
