// Category page credit https://fakeapi.platzi.com/
import Link from "next/link";
const category = [
    {
        "id": 1,
        "name": "Clothes",
        "image": "https://i.imgur.com/QkIa5tT.jpeg"
    },
    {
        "id": 2,
        "name": "Electronics",
        "image": "https://i.imgur.com/ZANVnHE.jpeg"
    },
    {
        "id": 3,
        "name": "Furniture",
        "image": "https://i.imgur.com/Qphac99.jpeg"
    },
    {
        "id": 4,
        "name": "Shoes",
        "image": "https://i.imgur.com/qNOjJje.jpeg"
    },
    {
        "id": 5,
        "name": "Miscellaneous",
        "image": "https://i.imgur.com/BG8J0Fj.jpg"
    }
]

const page = () => {
    return (

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 h-[80vh]" >
            {category.map((item, index) => (
                <div key={index} className=" flex p-4 border border-gray-800 flex-col gap-2 items-center justify-center" >
                    <Link href={`/category/${item.name}`}>

                        <img alt="ecommerce" className="h-[35vh] object-fill object-center rounded" src={item.image} />
                        <h1 className="text-xl font-bold">{item.name}</h1>
                    </Link>
                </div>
            ))
            }
        </div>
    )
}
export default page;