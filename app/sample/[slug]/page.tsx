import { createEditor, getUser, getUserNotes } from "@/actions";
import { getServerSession } from "next-auth";
import { User } from "@/database/models/user";
import { Note } from "@/database/models/notes";
import dbConnect from "@/database/db-connect";
import { Editor } from "@/database/models/editor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SidebarPanel } from "../SidebarPanel";
import { NoteEditor } from "../NoteEditor";

export default async function page({ params }: { params: { slug: string } }) {
  console.log(params);
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
  const regularNotes = await Editor.find({
    ownerId: user._id.toString(),
    isPinned: false,
  });
  const favoriteNotes = await Editor.find({
    ownerId: user._id.toString(),
    isPinned: true,
  });
  const activeEditor = await Editor.findOne({ slug: params.slug });
  console.log({ activeEditor });

  // const [noteTitle, setNoteTitle] = useState("Hellow orld!");
  // const [editorContent, setEditorContent] = useState("");

  const handleClick = async () => {
    // const res = await createEditor(user._id)
    // console.log(res)
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <SidebarPanel
        user={user}
        favoriteNotes={favoriteNotes}
        regularNotes={regularNotes}
      />

      {activeEditor !== null ? (
        // <div className="size-full flex">{activeEditor.title}</div>
        <div className="size-full flex">
          <NoteEditor activeEditor={activeEditor} />
        </div>
      ) : (
        <div className="size-full flex">
          Seems like we didn't find your notes
        </div>
      )}

      {/* <NoteEditor
        noteTitle={noteTitle}
        setNoteTitle={setNoteTitle}
        editorContent={editorContent}
        setEditorContent={setEditorContent}
      /> */}
    </div>
  );
}
