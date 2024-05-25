import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const {data} = await req.json()
        const { orderId } = data;
        const updatedOrder = await prisma.order.update({
            where: { id: orderId },
            data: { payCompleted: true },
          });

        return Response.json(updatedOrder, {status : 200})
    } catch (error) {
        console.log(error)
        return Response.json("something went wrong", { status: 500 })
    }
}