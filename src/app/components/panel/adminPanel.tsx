'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
    const { data: session  } = useSession();
    
    return ( 
        <div>
            welcome admin!
        </div>
     );
}
 
export default AdminPanel;