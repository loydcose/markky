import Header from "@editorjs/header";
import List from "@editorjs/list";
import EditorJS from "@editorjs/editorjs";
import SimpleImage from "@editorjs/simple-image";
import Checklist from "@editorjs/checklist";
import RawCode from "@editorjs/raw";
import InlineCode from "@editorjs/inline-code";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import { getUserEditor, updateEditor } from "@/actions";
import { Blocks } from "@editorjs/editorjs/types/api";

const tools = {
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
    config: {
      preserveBlank: true,
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter a header",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 3,
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  image: SimpleImage,
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  code: RawCode,
  inlineCode: InlineCode,
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2,
      cols: 3,
    },
  },
};

const getEditorData = async (userId: string, editorId: string) => {
  const userEditor: Editor = await getUserEditor(userId, editorId);
  const parsedData = userEditor.content;

  if (
    parsedData ||
    parsedData?.blocks ||
    parsedData?.time ||
    parsedData?.version
  ) {
    return parsedData;
  }
  return {};
};

const initEditor = async (userId: string, editorId: string, isLocked: boolean) => {
  const editor = new EditorJS({
    // autofocus: true,
    placeholder: "Enter your note",
    readOnly: isLocked,
    holder: "editorjs",
    onReady: () => {
      console.log("Editor.js is ready to work");
    },
    onChange: async (api, event) => {
      const data = await editor.save();

      const result = await updateEditor(editorId, { content: data });

      // localStorage.setItem("editorData", JSON.stringify(data))
    },
    tools: tools,
    data: await getEditorData(userId, editorId),
  });
};
export { initEditor };
