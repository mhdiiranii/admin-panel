"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";
import Loading from "@/app/components/loading/loading";

const ShowUser = dynamic(() => import("../../../../components/panel/user-chart/showUserTable"), {
  ssr: false,
  loading: () => (
    <div className="w-full flex justify-center items-center">
      <Loading width={30} height={30} />
    </div>
  ),
});

const UsersPanel = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full flex justify-center items-center">
          <Loading width={30} height={30} />
        </div>
      }
    >
      <ShowUser />
    </Suspense>
  );
};

export default UsersPanel;
