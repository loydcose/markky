import { getServerSession } from "next-auth";
import { User } from "@/database/models/user";
import { Editor } from "@/database/models/editor";
import { SidebarPanel } from "../../../components/SidebarPanel";
import { NoteEditor } from "../../../components/NoteEditor";
import { dbConnect } from "@/database/db-connect";
import SaveEditorsToStore from "@/components/save-editors-to-store";
import { authOptions } from "@/lib/authOptions";

export default async function page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
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

  const res = await fetch(
    `${process.env.NEXTAUTH_URL}api/get-editors?userId=${user._id}`,
    {
      cache: "force-cache",
      next: { tags: ["notes"] },
    }
  );

  const regularNotes = await Editor.find({
    ownerId: user._id.toString(),
  });

  const activeEditor = await Editor.findOne({ slug: params.slug });
  const isNewEditor = (await searchParams).new;

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <SidebarPanel user={user} />

      {activeEditor !== null ? (
        <div className="size-full min-h-screen overflow-y-auto flex overflow-x-hidden min-w-full md:min-w-0">
          <NoteEditor
            userId={user._id}
            activeEditor={activeEditor}
            isNewEditor={!!isNewEditor}
          />
        </div>
      ) : (
        <div className="size-full flex">
          Seems like we didn&apos;t find your notes
        </div>
      )}

      <SaveEditorsToStore editors={regularNotes} />
    </div>
  );
}
