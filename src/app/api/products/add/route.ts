import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { productId } = await req.json();
        const session = await auth();
        const userId = session?.user?.id
        let user = await prisma.user.findUnique({
            where: { id: userId },
            include: { cart: { include: { cartItems: { include: { product: true } } } } }
        });
        if (!user) {
            return Response.json("user not found!", { status: 404 })
        }
        if (!user?.cart) {
            user = await prisma.user.update({
                where: { id: userId },
                data: { cart: { create: {} } },
                include: { cart: { include: { cartItems: { include: { product: true } } } } }
            });
        };

        const existingCartItem = user?.cart?.cartItems.some(
            (item) => item.product?.id === productId

        );
        if (existingCartItem) {
            return Response.json("cart alredy exists", { status: 409 })
        }


        await prisma.cartItem.create({
            data: {
                quantity: 1,
                cart: { connect: { id: user?.cart?.id } },
                product: { connect: { id: productId } }
            },
        });

        return Response.json("added to cart", { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json("something went wrong", { status: 500 })

    }


}