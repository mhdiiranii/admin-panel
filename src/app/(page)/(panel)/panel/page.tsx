"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import dynamic from "next/dynamic";
import FramerMotion from "@/app/components/loading/framer";
import { Suspense } from "react";

const UserChart = dynamic(() => import("../../../components/panel/user-chart/userChart"), {
  ssr: false,
  loading: () => <FramerMotion width="100%" height="250px" opacity="5" />,
});
const SellingProducts = dynamic(() => import("../../../components/panel/selling-products/sellingProducts"), {
  ssr: false,
  loading: () => <FramerMotion width="45%" height="250px" opacity="5" />,
});
const Visit = dynamic(() => import("../../../components/panel/visit/visit"), {
  ssr: false,
  loading: () => <FramerMotion width="45%" height="250px" opacity="5" />,
});

const test = [
  {
    id: 1,
    title: "users",
    count: 0,
    color: "bg-blue-400",
  },
  {
    id: 2,
    title: "products",
    count: 0,
    color: "bg-red-400",
  },
  {
    id: 3,
    title: "blog",
    count: 0,
    color: "bg-green-400",
  },
];
const FeaturePanel = [
  {
    id: 1,
    title: "users",
    href: "/panel/users",
    color: "bg-blue-400",
  },
  {
    id: 2,
    title: "products",
    href: "/panel/products",
    color: "bg-red-400",
  },
  {
    id: 3,
    title: "blog",
    href: "/panel/blog",
    color: "bg-green-400",
  },
];

const Admin = () => {
  const t = useTranslations("adminDashboard");

  return (
    <div className="flex flex-col pr-10 gap-10 w-full">
      <div className="w-full flex flex-col gap-8 justify-between">
        <Suspense fallback={<FramerMotion width="100%" height="250px" opacity="5" />}>
          <UserChart />
        </Suspense>
        <div className="flex justify-between">
          <Suspense fallback={<FramerMotion width="45%" height="250px" opacity="5" />}>
            <SellingProducts />
          </Suspense>
          <Suspense fallback={<FramerMotion width="45%" height="250px" opacity="5" />}>
            <Visit />
          </Suspense>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {test.map((item) => (
          <div className={`${item.color} flex flex-col justify-center rounded-lg`} key={item.id}>
            <span className=" text-center py-24">{item.count}</span>
            <p className="w-full text-center pb-4">{t(item.title)}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {FeaturePanel.map((item) => (
          <Link className={`${item.color} rounded-lg flex justify-center py-14`} key={item.id} href={item.href}>
            {t(item.title)}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Admin;
