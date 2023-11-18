import { Schema, models, model } from "mongoose"

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    // image: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
)

export const User = models.User || model("User", userSchema)

