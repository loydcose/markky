type Note = {
  _id: string;
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: date;
  updatedAt: date;
};

type User = {
  _id: string;
  name: string;
  email: string;
  createdAt: date;
  updatedAt: date;
};

type Editor = {
  _id: string;
  ownerId: string;
  title: string;
  content: Json;
  slug: string
  isLocked: boolean;
  isPinned: boolean;
  createdAt: date;
  updatedAt: date;
};

// fore editor js
declare module "@editorjs/header";
declare module "@editorjs/list";
declare module "@editorjs/simple-image";
declare module "@editorjs/checklist";
declare module "@editorjs/raw";
declare module "@editorjs/inline-code";
declare module "@editorjs/table";
declare module "@editorjs/paragraph";
