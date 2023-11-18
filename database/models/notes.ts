import { Schema, models, model } from "mongoose"

const noteSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    ownerId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: "Untitled"
    },
    content: {
      type: String,
    },
    isPinned: {
      type: String,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
)

export const Note = models.Note || model("Note", noteSchema)

