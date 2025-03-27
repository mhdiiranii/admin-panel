"use client";

import Link from "next/link";
import { useTranslations } from "use-intl";
import { useSession } from "next-auth/react";
import Image from "next/image";

const FeaturePanel = [
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
  const t = useTranslations("adminDashboard");
  const { data: session } = useSession();

  

  return (
    <div className={` flex items-center w-1/4 fixed left-0 top-0 bottom-0`}>
      <div className={`w-full flex flex-col gap-8 justify-between overflow-hidden h-full ease-in border rounded-r-2xl shadow-[0_0_15px_1px_rgba(0,0,0,0.5)]`}>
        <div className="flex flex-col gap-4 items-start overflow-hidden ">
          <div className="flex flex-col items-start border-b rounded-lg w-full py-2 px-4 bg-amber-100">
            <div className="flex justify-between items-center gap-2">
              <Image width={70} height={70} alt="person" className="rounded-full" src={"/svg/person.svg"} />
              <h3 className="text-lg font-bold">Generator</h3>
            </div>
            <h4 className="text-lg font-bold">{session?.user?.username}</h4>
            <p className="text-sm font-light">{session?.user?.email}</p>
          </div>
          <div className="flex flex-col items-start w-full">
            {FeaturePanel.map((item) => (
              <Link className="w-full px-4 py-2.5 hover:bg-amber-50 duration-200" key={item.id} href={item.href}>
                {t(item.title)}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 overflow-hidden border-t rounded-lg bg-amber-100 py-2 px-4">
          {RoutesBottom.map((item) => (
            <Link className="py-2 text-center rounded-lg hover:bg-amber-50 duration-200" key={item.id} href={item.href}>
              {t(item.title)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideBarPanel;
