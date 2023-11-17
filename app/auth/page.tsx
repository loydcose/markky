import GithubIcon from "@/components/icons/github-icon"
import GoogleIcon from "@/components/icons/google-icon"

export default function page() {
  return (
    <main className="flex">
      <div className="mx-auto min-h-screen max-w-[390px] w-11/12 text-zinc-500 flex flex-col py-20">
        <h1 className="font-bold text-zinc-300 text-center">Markky</h1>
        <p className="text-center">A minimalist notes manager.</p>
        <hr className="border-none h-px bg-zinc-700 w-1/2 my-8 mx-auto" />
        <section className="mt-auto">
          <div className="flex items-center gap-4 justify-center mb-6">
            <button
              title="Sign in with Google"
              type="button"
              className="p-3 rounded-full bg-zinc-700 transition-all flex items-center justify-center hover:bg-zinc-600"
            >
              <GoogleIcon />
            </button>
            <button
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
