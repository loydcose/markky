"use server"

import dbConnect from "./database/db-connect"
import { Note } from "./database/models/notes"
import { User } from "./database/models/user"



export const getUser = async (userId: string) => {
  await dbConnect()
  const foundUser = User.findOne({ _id: userId })

  return foundUser
}



export const getUserNotes = async (userId: string) => {
  await dbConnect()
  const foundNotes = Note.find({ ownerId: userId })

  return foundNotes
}