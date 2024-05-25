import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link"
interface Product {
  name: string;
  image: string;
}
export function CarouselPlugin({product}: {product : Product[]}) {
  return (
    <Carousel className="lg:w-4/5` w-full">
      <CarouselContent>
        {product.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card >
                <Link href={`/category/${item.name}`}>
                <CardContent className="flex items-center h-[40vh] p-6">
                  <span className="text-4xl p-4 bg-opacity-50 bg-black rounded-r-md absolute  font-semibold">{item.name}</span>
                  <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={item.image} />
                </CardContent>
                </Link>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent >
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
