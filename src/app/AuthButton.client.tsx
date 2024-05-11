// @ts-nocheck
"use client";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";

import { signIn } from "@/auth/helpers";
import UserAvatar  from "@/components/avatar";

export default function AuthButton() {
  const session = useSession();

  return session?.data?.user ? (

    <UserAvatar name={session.data?.user?.name} src={session.data?.user?.image}/>
    
  ) : (
    <>
    <Button onClick={async () => await signIn()}>Sign In</Button>
    </>

  );
}
