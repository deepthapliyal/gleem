"use client"
import { signOut } from "@/auth/helpers";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Page() {
    const router = useRouter()
    const session = useSession();
    const handleSignOut = async ()=>{
        await signOut(); 
        router.refresh;
    
      }
   

    if (session.status === "unauthenticated") {
        router.push("/api/auth/signin")
    }



    return session?.data?.user?.image &&  session?.data?.user?.name ? (
        <div className="mt-[10vh] gap-8 flex flex-col justify-center items-center max-h[90vh]">

            <div>
                <Avatar className="w-40 h-40">
                    <AvatarImage  src={session?.data?.user?.image} alt="@shadcn" />
                    <AvatarFallback>{session?.data?.user?.name[0]}</AvatarFallback>
                </Avatar>
            </div>
            <div className="text-center">
                <h1 className="text-lg">{session?.data?.user?.name}</h1>
                <p>{session?.data?.user?.email}</p>
            </div>

            <div>
                <Button variant={"destructive"} onClick={handleSignOut}>Log out</Button>
            </div>


        </div>
    )   
        : (
            <div>No user found!!</div>
        )

}