"use server"

import mongoose from "mongoose"
import dbConnect from "./database/db-connect"
import { Note } from "./database/models/notes"
import { User } from "./database/models/user"

const validateId = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid, not a mongoose Id.")
  }
  await dbConnect()
}

export const getUser = async (userId: string) => {
  await validateId(userId)
  const foundUser = User.findOne({ _id: userId })

  return foundUser
}

export const getUserNotes = async (userId: string) => {
  await validateId(userId)
  const foundNotes = await Note.find({ ownerId: userId })

  return foundNotes
}

export const createNote = async (userId: string) => {
  await validateId(userId)

  const note = await Note.create({
    ownerId: userId,
  })

  return note
}

export const updateNote = async (
  noteId: string,
  newValues: Record<string, any>
) => {
  await validateId(noteId)

  const note = await Note.updateOne(
    {
      _id: noteId,
    },
    {
      $set: newValues,
    }
  )

  return note
}

export const deleteNote = async (noteId: string) => {
  await validateId(noteId)

  const note = await Note.deleteOne({
    _id: noteId,
  })

  return note
}
