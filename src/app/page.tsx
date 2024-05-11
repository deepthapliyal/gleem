import { auth } from "@/auth";
import { DataTable } from "@/components/table";


export default async function Home() {
  const session = await auth();
  if(!session?.user){
    console.log("not authenticated!!")
  }


  return (
    <>
      <div className="flex justify-center flex-col gap-8 items-center ">
        <h1 className="text-3xl font-bold">Welcome {session?.user?.name}</h1>
        <DataTable/>
      </div>


    </>
  );
}
