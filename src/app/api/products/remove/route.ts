import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export const DELETE = async (req: NextRequest) => {
    try {
        const session = await auth();
        const user = session?.user;
        const {cartItemId} = await req.json();
        if(!user){
            return Response.json("user not found", { status: 404 })
        }
        const userId = user.id;
        await prisma.cartItem.delete({
            where: {id : cartItemId, cart : {userId: userId}},

        })
        return Response.json("item removed", { status: 200 })

    } catch (error) {
        console.log(error)
        return Response.json("something went wrong", { status: 500 })
    }
}