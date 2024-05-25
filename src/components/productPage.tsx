"use client"
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { Product } from "@/types/productType";
interface Products {
    product: Product 
  }
const ProductPage = ({ product } : Products) => {

    const [addProduct, setAddProduct] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const addToCart = async () => {
        setAddProduct(true);
        try {
            
            const reponse = await fetch("/api/products/add", {
                method: "POST",
            body: JSON.stringify({ productId: product.id })
        })
        if (reponse.ok) {
            setAddProduct(false)
            setIsAddedToCart(true);
        }
        if(reponse.status == 409){
            setIsAddedToCart(true);

        }
        else {

            console.log(reponse.json())
            
        }
        
        setAddProduct(false);
        
        
        
    } catch (error) {

        
    }
    }

    return (
        
        <section className="text-gray-600 dark:text-gray-300 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product?.image} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <Link href={`category/${product?.category}`}>
                            <h2 className="text-sm title-font  text-gray-500 dark:text-gray-400 tracking-widest">{product?.category}</h2>
                        </Link>
                        <h1 className="text-gray-900 dark:text-gray-100 text-3xl title-font font-medium mb-1">{product?.title}</h1>
                        <div className="flex mb-4">
                            <span className="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300 ml-3">4 Reviews</span>
                            </span>
                        </div>
                        <p className="leading-relaxed">{product?.description}</p>

                        <div className="flex gap-2 mt-4">
                            <span className="title-font font-medium text-2xl text-gray-900 dark:text-gray-100">${product?.price}</span>
                            {isAddedToCart ?

                                <a className="ml-auto"  href={"/cart"}><Button >Go to cart</Button></a>
                                :
                                <>
                                    {
                                        addProduct ?
                                            <Button className="ml-auto" >loading</Button>
                                            :

                                            <Button onClick={addToCart} className="ml-auto" >Add to cart</Button>
                                    }
                                </>
                            }
                        

                      
                            <Button className="bg-red-500 hover:bg-red-600">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

export default ProductPage;