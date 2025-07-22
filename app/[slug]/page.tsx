import { getServerSession } from "next-auth";
import { User } from "@/database/models/user";
import { Editor } from "@/database/models/editor";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SidebarPanel } from "../../components/SidebarPanel";
import { NoteEditor } from "../../components/NoteEditor";
import { dbConnect } from "@/database/db-connect";

export default async function page({ params }: { params: { slug: string } }) {
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
  const favoriteNotes = await Editor.find({
    ownerId: user._id.toString(),
    isPinned: true,
  });
  const activeEditor = await Editor.findOne({ slug: params.slug });

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <SidebarPanel
        user={user}
        favoriteNotes={favoriteNotes}
        regularNotes={regularNotes}
      />

      {activeEditor !== null ? (
        <div className="size-full flex">
          <NoteEditor userId={user._id} activeEditor={activeEditor} />
        </div>
      ) : (
        <div className="size-full flex">
          Seems like we didn't find your notes
        </div>
      )}
    </div>
  );
}
