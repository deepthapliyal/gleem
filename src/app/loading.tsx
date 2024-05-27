import Image from "next/image";


export default function Loading(){

    return (
        <div className="flex justify-center items-center h-screen ">
        <Image alt="loading" height={50} width={50} src={'/assets/loading.gif'} />
        </div>
        )
}