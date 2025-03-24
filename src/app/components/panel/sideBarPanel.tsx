"use client";

import { IoMdArrowDropright } from "react-icons/io";
import Button from "../button/Button";
import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "use-intl";
import { useSession } from "next-auth/react";

const RoutesTop = [
  {
    id: 1,
    title: "dashboard",
    href: "/panel/",
  },
  {
    id: 2,
    title: "users",
    href: "/panel/users",
  },
  {
    id: 3,
    title: "products",
    href: "/panel/products",
  },
  {
    id: 4,
    title: "blog",
    href: "/panel/blog",
  },
];
const RoutesBottom = [
  {
    id: 1,
    title: "home",
    href: "/",
  },
  {
    id: 2,
    title: "about",
    href: "/about",
  },
  {
    id: 3,
    title: "contact",
    href: "/contact-us",
  },
  {
    id: 4,
    title: "products",
    href: "/products",
  },
  {
    id: 5,
    title: "blog",
    href: "/blogs",
  },
  {
    id: 6,
    title: "profile",
    href: "/profile",
  },
];

const SideBarPanel = () => {
  const [sideToggle, setSideToggle] = useState<boolean>(false);
  const t = useTranslations("adminDashboard");
  const { data: session } = useSession();

  const handleSide = () => {
    setSideToggle(() => (sideToggle ? false : true));
  };

  return (
    <div className={`${!sideToggle ? "translate-x-0 w-1/4" : "-translate-x-[59%] w-14"} duration-300 ease-in flex items-center h-screen`}>
      <div className={`w-full flex flex-col gap-8 justify-between overflow-hidden h-full ease-in border rounded-r-2xl shadow-[0_0_15px_1px_rgba(0,0,0,0.5)] p-2`}>
        <div className="flex flex-col gap-10 items-start overflow-hidden ">
          <div>
            <h3>Generator</h3>
            <h4>{session?.user?.username}</h4>
            <p>{session?.user?.email}</p>
          </div>
          <div className="flex flex-col ">
            {RoutesTop.map((item) => (
              <Link key={item.id} href={item.href}>
                {t(item.title)}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 overflow-hidden">
          {RoutesBottom.map((item) => (
            <Link key={item.id} href={item.href}>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </div>
      <Button type="button" onClick={handleSide} className="h-14 w-5  flex items-center text-amber-100 bg-black rounded-r-full">
        <IoMdArrowDropright className={`${sideToggle ? "rotate-180" : "rotate-0"}`} />
      </Button>
    </div>
  );
};

export default SideBarPanel;
