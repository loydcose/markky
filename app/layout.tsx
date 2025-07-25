import type { Metadata } from "next";
import { Inter, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Provider from "../contexts/client-provider";
import { Toaster } from "@/components/ui/sonner";
import { authOptions } from "@/lib/authOptions";

const inter = Inter({ subsets: ["latin"] });
const notoSansMono = Noto_Sans_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mini Notion",
  description: "Your minimalist notes manager.",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " min-h-screen bg-white dark:bg-zinc-900 text-sm font-medium"
        }
      >
        <Provider session={session}>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
