"use client";
import { createEditor } from "@/actions";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
import { FileText, Plus } from "lucide-react";

export default function CreateNewEditorDisplay({ userId }: { userId: string }) {
  const router = useRouter();

  return (
    <div className="size-full flex">
      <form
        action={async () => {
          const res = await createEditor(userId);
          router.push("/editors/" + res.slug + "?new=true");
        }}
        className="m-auto flex flex-col gap-3 items-center"
      >
          <FileText size={52} strokeWidth={1} />
        <p>Ready to create a note?</p>
        <Button variant={"outline"}>
          Create a note <Plus />
        </Button>
      </form>
    </div>
  );
}
