import ProductGrid from "@/components/productgrid";
import prisma from "@/lib/db";
type PageProps = {
    params: {
        product: string;
    }
}

const page = async ({ params: { product } }: PageProps) => {
    const products = await prisma.product.findMany({
        where: {
            category: product
        }
    })
    return (
        <ProductGrid product={products} />
    )
}

export default page;