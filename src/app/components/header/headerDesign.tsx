"use client";

import Link from "next/link";
import Button from "../button/Button";
import { useEffect, useState } from "react";
import { ChangeLg } from "@/services/language";
import Box from "../toggle-box/toggleBox";
import Image from "next/image";
import { HiLogin } from "react-icons/hi";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const items = [
  { id: 1, title: "Home", href: "/", type: "public" },
  { id: 2, title: "About", href: "/about", type: "public" },
  { id: 3, title: "Contact us", href: "/constat-us", type: "public" },
  { id: 4, title: "Products", href: "/products", type: "user" },
  { id: 5, title: "Profile", href: "/profile", type: "user" },
  { id: 6, title: "Panel", href: "/panel", type: "admin" },
];
interface propsType {
  session: Session | null;
}
const HeaderDesign = ({ session }: propsType) => {
  const [lg, setLg] = useState<string>("en");
  const [toggle, setToggle] = useState<boolean>(false);
  const [nameLg, setNameLg] = useState<string>("En");
  const [side, setSide] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    ChangeLg(lg);
  }, [lg]);
  
  const handleToggle = () => {
    setToggle(() => (toggle ? false : true));
  };

  const setFarsi = () => {
    setLg("fa");
    setNameLg("Fa");
  };
  const setEnglish = () => {
    setLg("en");
    setNameLg("En");
  };
  const openSide = () => {
    setSide(() => (side ? false : true));
  };
  const signOutUser = async ()=>{
    await signOut();
    openSide()
    router.push('/sign-in')
  }

  return (
    <div className="shadow-[0_0px_20px_1px_rgba(0,0,0,0.2)] flex justify-between items-center ">
      <div className="flex">
        {session?.user
          ? session?.user?.role === "admin"
            ? items.map((routes) => (
                <Link className="px-8 py-4 hover:bg-amber-100 duration-300 text-sm font-bold" key={routes.id} href={routes.href}>
                  {routes.title}
                </Link>
              ))
            : items
                .filter((item) => item.type === "user" || item.type === "public")
                .map((routes) => (
                  <Link className="px-8 py-4 hover:bg-amber-100 duration-300 text-sm font-bold" key={routes.id} href={routes.href}>
                    {routes.title}
                  </Link>
                ))
          : items.map(
              (routes) =>
                routes.type === "public" && (
                  <Link className="px-8 py-4 hover:bg-amber-100 duration-300 text-sm font-bold" key={routes.id} href={routes.href}>
                    {routes.title}
                  </Link>
                )
            )}
      </div>

      <div className="flex relative ">
        <div className={`${side ? "translate-x-0" : "translate-x-3/4"} pl-1 duration-200 ease-in flex overflow-hidden`}>
          <Button onClick={openSide} type="button" className={` flex justify-center items-center gap-1`}>
            <HiLogin className={`${side ? "rotate-180 " : "rotate-0 "} duration-500 mt-1`} size={30} />
          </Button>
          <div className={`flex items-center  justify-center text-xs `}>
            {session?.user ? (
              <>
                {" "}
                <Button onClick={signOutUser} className={`${side ? "px-6 py-4" : ""} ml-4 hover:bg-amber-100 duration-300 text-sm font-bold rounded-lg`}>
                  Sign Out
                </Button>
               {" "}
              </>
            ) : (
              <>
                {" "}
                <Link onClick={openSide} href={"/sign-in"} className={`${side ? "px-6 py-4" : ""} hover:bg-amber-100 duration-300 text-sm font-bold rounded-lg`}>
                  Sign In
                </Link>
                <Link onClick={openSide} href={"/sign-up"} className={`${side ? "px-6 py-4" : ""} hover:bg-amber-100 duration-300 text-sm font-bold rounded-lg `}>
                  Sign Up
                </Link>{" "}
              </>
            )}
          </div>
        </div>
        <Button onClick={handleToggle} type="button" className="bg-white z-10 hover:bg-amber-100 px-6 py-4 duration-300 text-sm font-bold flex gap-1">
          {nameLg}
          <Image width={20} height={20} alt="flag" src={`/flag/${lg}.svg`} />
        </Button>
        <Box onToggle={handleToggle} toggle={toggle} possition="bottom-left" clasName="text-xs  font-bold flex flex-col items-start ">
          <Button className="w-full text-start px-4 py-2 hover:bg-amber-100 duration-200" type="button" onClick={setFarsi}>
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

export default HeaderDesign;
