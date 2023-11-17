import { X } from "lucide-react"
import GoogleIcon from "./icons/google-icon"
import GithubIcon from "./icons/github-icon"

export default function LoginModal() {
  return (
    <div className="fixed inset-0 bg-black/5 flex z-10">
      <div className="m-auto max-w-[390px] w-11/12 text-zinc-500 bg-zinc-800 p-6 rounded-md">
        <div className="flex items-center gap-2 justify-between mb-4">
          <p>Please login to continue.</p>
          <button
            type="button"
            className="text-zinc-600 p-1 hover:text-zinc-400 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <button
          type="button"
          className="py-2 w-full hover:bg-zinc-700 transition-all rounded-md border border-zinc-700 hover:text-zinc-400 flex items-center gap-2 justify-center mb-2"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>
        <button
          type="button"
          className="py-2 w-full hover:bg-zinc-700 transition-all rounded-md border border-zinc-700 hover:text-zinc-400 flex items-center gap-2 justify-center"
        >
          <GithubIcon />
          <span>Github</span>
        </button>
      </div>
    </div>
  )
}
