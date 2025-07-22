"use client";

import { useEditorStore } from "@/slices/editors-store";
import React, { useEffect } from "react";

export default function SaveEditorsToStore({ editors }: { editors: Editor[] }) {
  const { setEditors } = useEditorStore();

  useEffect(() => {
    setEditors(editors);
  }, []);

  return <></>;
}
