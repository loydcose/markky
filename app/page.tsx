import { createEditor } from "@/actions";
import { getServerSession } from "next-auth";
import { User } from "@/database/models/user";
import { Editor } from "@/database/models/editor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SidebarPanel } from "@/components/SidebarPanel";
import { dbConnect } from "@/database/db-connect";

export default async function page() {
  const session = await getServerSession(authOptions);
  const sessionUser = session?.user;

  await dbConnect();
  let user = await User.findOne({ email: sessionUser?.email });
  if (!user) {
    user = await User.create({
      email: sessionUser?.email,
      name: sessionUser?.name,
    });
  }

  const regularNotes = await Editor.find({
    ownerId: user._id.toString(),
    isPinned: false,
  });

  console.log(regularNotes)

  const favoriteNotes = await Editor.find({
    ownerId: user._id.toString(),
    isPinned: true,
  });

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <SidebarPanel
        user={user}
        favoriteNotes={favoriteNotes}
        regularNotes={regularNotes}
      />

      <div className="size-full flex">
        <form
          action={async () => {
            "use server";
            const res = await createEditor(user._id);
            redirect("/" + res.slug);
          }}
          className="m-auto flex flex-col gap-3"
        >
          <p>Ready to create a note?</p>
          <Button variant={"outline"}>
            Create a note <Plus />
          </Button>
        </form>
      </div>
    </div>
  );
}
