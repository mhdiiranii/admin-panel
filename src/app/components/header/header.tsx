import Link from "next/link";

const items = [
    {id:1,title:'Home',href:'/'},
    {id:2,title:'About',href:'/about'},
    {id:3,title:'Contact us',href:'/constat-us'},
    {id:4,title:'Products',href:'/products'},
    {id:5,title:'Profile',href:'/profile'},
    {id:6,title:'Panel',href:'/panel'},
]

const Header = () => {
    return ( 
        <div className="shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)] flex justify-start items-center ">
            {
                items.map((routes)=>(
                    <Link className="px-8 py-4 hover:bg-amber-100 duration-300 text-sm font-bold" key={routes.id} href={routes.href}>{routes.title}</Link>
                ))
            }
        </div>
     );
}
 
export default Header;