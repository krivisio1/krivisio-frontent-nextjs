import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16">
        <div className="flex max-w-3xl flex-col items-center text-center">
          <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <ShieldX className="h-12 w-12 text-[#ff5722]" strokeWidth={1.5} />
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-black md:text-6xl lg:text-7xl">
            ACCESS{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-[#ff5722] px-4 py-2 text-white">
                DENIED
              </span>
            </span>
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-gray-700 md:text-xl">
            You don't have permission to access this resource. Please contact
            your administrator or sign in with an authorized account.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              className="bg-[#ff5722] text-white hover:bg-[#f4511e] rounded-md px-8 py-6 text-base"
            >
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
