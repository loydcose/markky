"use server";

import mongoose from "mongoose";
import { User } from "./database/models/user";
import { Editor } from "./database/models/editor";
import { revalidatePath } from "next/cache";
import { dbConnect } from "./database/db-connect";

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


export const revalidateByPath = async (path: string) => {
  revalidatePath(path)
}
