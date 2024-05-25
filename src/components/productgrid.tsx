import { Product } from "@/types/productType";
import Link from "next/link";

interface Products {
    product: Product[];
  }
const ProductGrid = ({ product } : Products) => {
    return (
        <section className="text-gray-600 dark:text-gray-300 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 ">
                    {product.map((item, index) => (
                        <div key={index} className="lg:w-1/5  cursor-pointer md:w-1/2 p-4 border dark:border-gray-900 rounded-md  w-full">
                            <Link href={`/products/${item.id}`} className="block relative h-48 rounded overflow-hidden">
                                <img alt="ecommerce" className="object-contain rounded-lg object-center w-full h-full block" src={item.image} />
                            </Link>

                            <div className="mt-4 flex flex-col items-center justify-center text-center">
                                <Link href={`/category/${item.category}`}>
                                <h3 className="text-gray-500 p-1 dark:bg-gray-600 bg-gray-300 dark:text-gray-200  rounded-md  text-xs tracking-widest title-font mb-1">{item.category}</h3>
                                </Link>
                                <h2 className="text-gray-900 dark:text-gray-100 title-font text-lg font-medium">{item.title}</h2>
                                <p className="mt-1">${item.price}</p>
                            </div>
                        </div>

                    ))
                    }
                </div>
            </div>
        </section>

    )
}

export default ProductGrid;