import * as React from "react"
import { Product } from "@/types/productType"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
interface Products {
  product: Product[];
}
export function CarouselSpacing({product} : Products) {
  return (
    <Carousel className="w-full lg:max-w-4/5">
      <CarouselContent className="-ml-1">
        {product.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 dark:border-gray-900  lg:basis-1/3">
            <Link href={item.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square  items-center p-6">
                  <img src={item.image} className=" object-contain object-center w-full h-full block"/>
                </CardContent>
                <CardFooter className="bg-black flex-col bg-opacity-50 p-4 h-20 flex items-center justify-center ">
                 {item.title}
                  <span className="bg-black p-2 top-0 bg-opacity-30 text-white">${item.price}</span>

                </CardFooter>
              </Card>
            </div>
          </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
