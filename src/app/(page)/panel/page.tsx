import AdminPanel from "@/app/components/panel/adminPanel";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

export default async function Admin() {

    const session = await auth();
    console.log(session?.user?.role)
    if(session?.user?.role !== 'admin'){
        notFound()
    }

    return(
        <AdminPanel/>
    )
    
}