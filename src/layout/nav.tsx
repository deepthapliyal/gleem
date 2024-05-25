
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AuthButtonClient from "@/app/AuthButton.client";
import { SessionProvider } from "next-auth/react";
import { BASE_PATH, auth } from "@/auth";
import { School, ShoppingCart } from "lucide-react";

export default async function Navbar() {
    const session = await auth();
  return (
    <nav className="fixed  inset-x-0 top-0 z-50 bg-white shadow-sm dark:bg-gray-950/90">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <Link className="flex items-center" href="/">
            <School className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/">
              Home
            </Link>
            {/* <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/about">
              About
            </Link> */}
            <Link className="font-medium flex items-center text-sm transition-colors hover:underline" href="/category">
              Categories
            </Link>
            <Link  className="font-medium flex items-center text-sm transition-colors hover:underline" href="mailto:deepakthapliyal47@gmail.com">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-6">
            {/* <Button size="sm" variant="outline">
              Sign in
            </Button>
            <Button size="sm">Sign up</Button> */}
            <Link href={'/cart'}>
            <ShoppingCart/>
            </Link>
            <SessionProvider basePath={BASE_PATH} session={session}>
            <AuthButtonClient/>
            </SessionProvider>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

function MountainIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}