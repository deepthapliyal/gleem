"use client"
import { signOut } from "@/auth/helpers";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter()
    const session = useSession();
    const handleSignOut = async () => {
        await signOut();
        location.reload()

    }
    if (session.status === "unauthenticated") {
        router.push("/api/auth/signin")
    }
    return session?.data?.user?.image && session?.data?.user?.name ? (
        <div className="mt-[10vh] gap-8 flex flex-col justify-center items-center max-h[90vh]">

            <div>
                <Avatar className="w-40 h-40">
                    <AvatarImage src={session?.data?.user?.image} alt="@shadcn" />
                    <AvatarFallback>{session?.data?.user?.name[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="text-center">
                <h1 className="text-lg">{session?.data?.user?.name}</h1>
                <p>{session?.data?.user?.email}</p>
            </div>

            <div className="gap-3 flex flex-row">
                <Button variant={"destructive"} onClick={handleSignOut}>Log out</Button>
                <Link href={'/cart'}>
                <Button className="bg-green-500 hover:bg-green-600">My Cart</Button>
                </Link>
                <Link href={'/orders'}>
                <Button variant={"secondary"}>My Orders</Button>
                </Link>
            </div>
        </div>
    )
        : (
            <div>No user found!!</div>
        )

}