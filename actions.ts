"use server";

import mongoose from "mongoose";
import dbConnect from "./database/db-connect";
import { Note } from "./database/models/notes";
import { User } from "./database/models/user";
import { Editor } from "./database/models/editor";

const validateId = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid, not a mongoose Id.");
  }
  await dbConnect();
};

export const getUser = async (userId: string) => {
  await validateId(userId);
  const foundUser = User.findOne({ _id: userId });

  return foundUser;
};

export const getUserNotes = async (userId: string) => {
  await validateId(userId);
  const foundNotes = await Note.find({ ownerId: userId });

  return foundNotes;
};

export const createNote = async (userId: string) => {
  await validateId(userId);

  const note = await Note.create({
    ownerId: userId,
  });

  return note;
};

export const updateNote = async (
  noteId: string,
  newValues: Record<string, any>
) => {
  await validateId(noteId);

  const note = await Note.updateOne(
    {
      _id: noteId,
    },
    {
      $set: newValues,
    }
  );

  return note;
};

export const deleteNote = async (noteId: string) => {
  await validateId(noteId);

  const note = await Note.deleteOne({
    _id: noteId,
  });

  return note;
};

// editor js

export const createEditor = async (userId: string) => {
  await validateId(userId);

  try {
    const editor = await Editor.create({
      ownerId: userId,
      slug: `Untitled-${Date.now()}`,
    });

    return editor;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export const updateEditor = async (
  editorId: string,
  newValues: Record<string, any>
) => {
  await validateId(editorId);

  try {
    const editor = await Editor.updateOne(
      {
        _id: editorId,
      },
      {
        $set: newValues,
      }
    );

    return editor;
  } catch (error: any) {
    console.error(error);
    console.log("threw an error!")
    throw new Error(error)
    return null;
  }
};

export const deleteEditor = async (editorId: string) => {
  await validateId(editorId);

  const editor = await Editor.deleteOne({
    _id: editorId,
  });

  return editor;
};

export const getUserEditor = async (userId: string, editorId: string) => {
  await validateId(userId);
  await validateId(editorId);
  const foundEditor = await Editor.findOne({ ownerId: userId, _id: editorId });

  return foundEditor;
};
