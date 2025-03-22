import Image from "next/image";
import Link from "next/link";

const items = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "About", href: "/about" },
  { id: 3, title: "Contact us", href: "/constat-us" },
  { id: 4, title: "Products", href: "/products" },
  { id: 5, title: "Profile", href: "/profile" },
  { id: 6, title: "Panel", href: "/panel" },
];

const Footer = () => {
  return (
    <div className="shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)] flex px-10 py-6 justify-between items-center ">
      <div className="grid grid-cols-2 w-1/3">
        {items.map((routes) => (
          <Link className="px-8 py-4 w-1/2 text-center hover:bg-amber-100 duration-300 text-xs font-light" key={routes.id} href={routes.href}>
            {routes.title}
          </Link>
        ))}
      </div>
      <div className="w-1/3 flex  justify-center items-center">
        <Image width={250} height={250} className="" src={"/png/developer.png"} alt="developer" />
      </div>
    </div>
  );
};

export default Footer;
