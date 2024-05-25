import ProductPage from "@/components/productPage";
import prisma from "@/lib/db";
type PageProps = {
    params: {
        slug: string;
    }
}
const Page = async ({ params: { slug } }: PageProps) => {
    const Product = await prisma.product.findUnique({
        where: {
            id: slug
        }
    })
    if(!Product){
        return <div>No Product found!</div>
    }
    return (
        <>
           <ProductPage product={Product}/>
        </>
    )
}

export default Page;