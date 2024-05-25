import { auth } from "@/auth";
import { CarouselPlugin } from "@/components/carousel";
import { CarouselSpacing } from "@/components/mutlipleProductCarousel";
import ProductGrid from "@/components/productgrid";
import prisma from "@/lib/db";


export default async function Home() {
 const craouselProducts = [ 
  {
    "image" : "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "name": "Clothes",
  },
  {
    "image" : "https://images.pexels.com/photos/1208777/pexels-photo-1208777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "name": "Shoes",
  },
  {
    "image" : "https://images.pexels.com/photos/7679452/pexels-photo-7679452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "name": "Electronics",
  },
  {
    "image" : "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "name": "Furniture",
  },

 ]

const products = await prisma.product.findMany()
  return (
    <>
      <div className="flex justify-center flex-col gap-8 items-center ">
        <CarouselPlugin product={craouselProducts}/>
        <ProductGrid product={products}/>
        <CarouselSpacing product={products}/>
        <ProductGrid product={products}/>
      </div>
    </>
  );
}
