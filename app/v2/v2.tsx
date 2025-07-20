"use client";

import { createEditor } from "@/actions";
import EditorJs from "./editor-js";

export default function V2({
  initUser,
  initUserEditors,
}: {
  initUser: User;
  initUserEditors: Editor[];
}) {
  console.log(initUser);

  const handleClick = async () => {
    // const editor = await createEditor(initUser._id);
    // console.log(editor);
  };

  return (
    <main className="relative text-black">
      <section className="p-8 md:p-16 grow w-full">
        hello world!
        <button type="button" onClick={handleClick}>
          click me to fetch
        </button>
        <EditorJs userId={initUser._id} editorId={initUserEditors[0]._id}/>
      </section>
    </main>
  );
}
