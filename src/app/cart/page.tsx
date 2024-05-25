
import { auth } from "@/auth";
import prisma from "@/lib/db";
import CartItemOptions from "./CartItemOptions";
const Page = async () => {
    const session = await auth();
    const userId = session?.user?.id;
    let cart
    try {
        cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: {
                cartItems: {
                    include: { product: true },
                }
            }
        })
    } catch (error) {
        return (

            <div className="flex justify-center items-center h-[90vh]">Something went wrong</div>
        )

    }
    if (!cart) {
        return <div></div>
    }
    return (
        <div className="flex flex-col text-2xl items-center p-4 gap-6 h-[80vh]" >
            {cart?.cartItems.length != 0 ?
                cart['cartItems'].map((item, index) => (
                    <div key={index} className="flex border p-2 justify-between w-full">
                        <div className="flex items-center gap-4">
                            <img className="w-20 rounded-lg" src={item.product?.image} alt="" />
                            <h1 className="text-xl">{item.product?.title}</h1>
                        </div>
                        <div className="flex items-center gap-4">

                            <CartItemOptions item={item} />
                        </div>
                    </div>
                ))
                :
                <>

                    Your cart is empty
                </>
            }
        </div>

    )
}

export default Page;