"use client";

import Link from "next/link";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { ChangeLg } from "@/services/language";
import Box from "../toggle-box/toggleBox";
import Image from "next/image";

const items = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "About", href: "/about" },
  { id: 3, title: "Contact us", href: "/constat-us" },
  { id: 4, title: "Products", href: "/products" },
  { id: 5, title: "Profile", href: "/profile" },
  { id: 6, title: "Panel", href: "/panel" },
];

const Header = () => {
  const [lg, setLg] = useState<string>("en");
  const [toggle, setToggle] = useState<boolean>(false);
  const [nameLg ,setNameLg] = useState <string> ('En')

  useEffect(() => {
    ChangeLg(lg);
  }, [lg]);

  const handleToggle = () => {
    setToggle(() => (toggle ? false : true));
  };


  const setFarsi = ()=>{
    setLg("fa")
    setNameLg('Fa')
  }
  const setEnglish = ()=>{
    setLg("en")
    setNameLg('En')
  }

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
        <Button onClick={handleToggle} type="button" className="hover:bg-amber-100 px-8 py-4 duration-300 text-sm font-bold flex gap-1">
          {nameLg}
          <Image width={20} height={20} alt="flag" src={`/flag/${lg}.svg`}/>
        </Button>
        <Box onToggle={handleToggle} toggle={toggle} possition="bottom-left" clasName="text-xs  font-bold flex flex-col items-start ">
          <Button  className="w-full text-start px-4 py-2 hover:bg-amber-100 duration-200" type="button" onClick={setFarsi}>
            farsi
          </Button>
          <Button className="w-full  text-start px-4 py-2 hover:bg-amber-100 duration-200" type="button" onClick={setEnglish}>
            english
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Header;
