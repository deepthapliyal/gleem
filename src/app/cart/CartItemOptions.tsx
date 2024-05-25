"use client"
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
type ItemProps = {
    item: {
        id: string;
        quantity: number;
        product: any;
    };
};
const CartItemOptions = ({ item }: ItemProps) => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(item.quantity)
    const removeItem = async () => {
        try {
            const response = await fetch("/api/products/remove", {
                method: "DELETE",
                body: JSON.stringify({ cartItemId: item.id })
            });
            if (response.ok) {
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        }
    }
    const addToOrder = async () => {
        try {
            const orderItems =
                { product: item.product, quantity }
            console.log(item, "item")
            const response = await axios.post('/api/products/order', { orderItems });
            console.log(response)
            if (response.status === 200) {
                const data = response.data;
                const product = item.product;
                const price = product.price * quantity
                router.push(`/pay/${price}/${data.id}`)
            }
            if (response.data.alreadyExists) {
                router.push(`/orders`)
            }
        } catch (error) {
            console.error('Error placing order:');
        }
    }

    return (
        <>
            <div className="flex gap-2 items-center">
                <Button onClick={() => setQuantity((prev) => Math.max(1, prev -= 1))}>-</Button>
                <p>quantity : {quantity} </p>
                <Button onClick={() => setQuantity(prev => prev += 1)}>+</Button>
            </div>
            <Button onClick={removeItem} className="bg-red-500 hover:bg-red-600">Remove item</Button>
            <Button onClick={addToOrder} className="bg-green-500 hover:bg-green-600">Place Order</Button>

        </>

    )
}

export default CartItemOptions;