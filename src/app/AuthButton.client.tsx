// @ts-nocheck
"use client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { signIn } from "@/auth/helpers";
import UserAvatar  from "@/components/avatar";
import Link from "next/link";

export default function AuthButton() {
  const session = useSession();
  const makeSignIn = ()=>{
    location.replace('/api/auth/signin')
  }

  return session?.data?.user ? (

    <UserAvatar name={session.data?.user?.name} src={session.data?.user?.image}/>
    
  ) : (
    <>
    <Button onClick={makeSignIn}>Sign In</Button>
    </>

  );
}
