import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Page = async () => {
    const session = await auth();
    const userId = session?.user?.id
    const orders = await prisma.order.findMany({
        where: { userId: userId },
        include : {product: true}
    })
    return (
        <div className="flex flex-col items-center p-4 gap-6 h-[80vh]">
            {
                orders.length === 0 ?
                <> <h1 className="text-3xl">No order founds</h1></>
                :
                orders.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4 items-center lg:flex-row border p-2 justify-between w-full">
                        <div className="flex items-center gap-4">
                            <img className="w-20 rounded-lg" src={item.product[0]?.image} alt="" />
                            <h1 className="text-xl">{item.product[0]?.title}</h1>
                        </div>
                        <div className="flex items-center gap-4">
                        <div className="bg-opacity-50 p-2 bg-gray-600 rounded-xl">{item.status}</div>
                        <div className="flex items-center gap-4">
                        <Button variant={"destructive"}>Cancel order</Button>
                        </div>
                        </div>
                    </div>
                ))
            }
        </div>


    )
}

export default Page;