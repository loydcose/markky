import { Schema, models, model } from "mongoose"

const noteSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: "Untitled"
    },
    content: {
      type: String,
    },
    isPinned: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

export const Note = models.Note || model("Note", noteSchema)

