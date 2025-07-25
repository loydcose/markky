import { Schema, models, model } from "mongoose";

const editorSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Untitled",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    content: {
      type: JSON,
    },
    isLocked: {
      type: Boolean,
      required: true,
      default: false, 
    },
    isPinned: {
      type: Boolean,
      required: true,
      default: false, // Used for favorites ("pinned"/favorite notes)
    },
  },
  { timestamps: true }
);

export const Editor = models.Editor || model("Editor", editorSchema);
