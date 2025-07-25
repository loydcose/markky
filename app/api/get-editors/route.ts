import { NextResponse } from 'next/server'
import { Editor } from '@/database/models/editor'
import { dbConnect } from '@/database/db-connect'

export async function GET(req: Request) {
  await dbConnect()

  const { searchParams } = new URL(req.url)
  const userId = searchParams.get('userId')

  const regularNotes = await Editor.find({ ownerId: userId })

  return NextResponse.json(regularNotes)
}
