"use client"

import { signIn } from "next-auth/react"
import GithubIcon from "@/components/icons/github-icon"
import GoogleIcon from "@/components/icons/google-icon"
import Image from "next/image"

export default function Auth() {
  return (
    <main className="flex">
      <div className="mx-auto min-h-screen max-w-[390px] w-11/12 text-zinc-500 flex flex-col py-20">
        {/* <h1 className="font-bold text-zinc-600 text-center">Mini Notion</h1> */}
        <Image src="/mini-notion-logo.png" alt="Mini notion logo"  width={150} height={150} className="mx-auto mb-4"/>

        <p className="text-center">Your minimalist notes manager.</p>
        <hr className="border-none h-px bg-zinc-700 w-1/2 my-8 mx-auto" />
        <section className="mt-auto">
          <div className="flex items-center gap-4 justify-center mb-6">
            <button
              onClick={() =>
                signIn("google", { callbackUrl: process.env.NEXTAUTH_URL })
              }
              title="Sign in with Google"
              type="button"
              className="p-3 rounded-full bg-zinc-700 transition-all flex items-center justify-center hover:bg-zinc-600"
            >
              <GoogleIcon />
            </button>
            <button
              onClick={() =>
                signIn("github", { callbackUrl: process.env.NEXTAUTH_URL })
              }
              title="Sign in with Github"
              type="button"
              className="p-3 rounded-full bg-zinc-700 transition-all flex items-center justify-center hover:bg-zinc-600"
            >
              <GithubIcon />
            </button>
          </div>
          <p className="text-center">Please login to continue.</p>
        </section>
      </div>
    </main>
  )
}
