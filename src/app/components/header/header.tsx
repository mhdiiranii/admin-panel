"use client";

import Link from "next/link";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { ChangeLg } from "@/services/language";
import Box from "../toggle-box/toggleBox";

const items = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "About", href: "/about" },
  { id: 3, title: "Contact us", href: "/constat-us" },
  { id: 4, title: "Products", href: "/products" },
  { id: 5, title: "Profile", href: "/profile" },
  { id: 6, title: "Panel", href: "/panel" },
];

const Header = () => {
  const [lg, setLg] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
    ChangeLg(lg);
  }, [lg]);

  const handleToggle = () => {
    setToggle(() => (toggle ? false : true));
  };

  return (
    <div className="shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)] flex justify-between items-center ">
      <div className="flex">
        {items.map((routes) => (
          <Link className="px-8 py-4 hover:bg-amber-100 duration-300 text-sm font-bold" key={routes.id} href={routes.href}>
            {routes.title}
          </Link>
        ))}
      </div>  

      <div className="flex gap-4 relative">
        <Button onClick={handleToggle} type="button" className="hover:bg-amber-100 px-8 py-4 duration-300 text-sm font-bold">
          Lg
        </Button>
        <Box onToggle={handleToggle} toggle={toggle} possition="bottom-left" clasName="text-xs font-bold flex flex-col items-start">
          <Button className="w-full  hover:bg-amber-100 duration-200" type="button" onClick={() => setLg("fa")}>
            farsi
          </Button>
          <Button className="w-full hover:bg-amber-100 duration-200" type="button" onClick={() => setLg("en")}>
            english
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Header;
