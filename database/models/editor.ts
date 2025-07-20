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
    },
    content: {
      type: JSON,
    },
    isPinned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

export const Editor = models.Editor || model("Editor", editorSchema);
