import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const session = await auth();
        const { orderItems } = await req.json();
        const user = await prisma.user.findUnique({
            where: { id: session?.user?.id },
            include: { Order: { include: { product: true } } }
        });
        if (!user) {
            return Response.json({ error: 'User not found' }, { status: 404 });
        }
        const existingOrderItem = user?.Order.some(
            (item) => item.product[0].id === orderItems.product.id

        );
        if (existingOrderItem) {
            return Response.json({ alreadyExists: true }, { status: 201 })
        }
        const order = await prisma.order.create({
            data: {
                user: { connect: { id: session?.user?.id } },
                product: { connect: { id: orderItems.product.id } },
                quantity: orderItems.quantity,
                status: 'PENDING',
                totalPrice: orderItems.product.price
            }
        });
        return Response.json(order, { status: 200 })
    } catch (error) {
        console.log(error)
        return Response.json("something went wrong", { status: 500 })
    }
}