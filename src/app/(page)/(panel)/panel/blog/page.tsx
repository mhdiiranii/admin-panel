"use client";

import FramerMotion from "@/app/components/loading/framer";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ManageBlogs = dynamic(() => import("@/app/components/panel/manage-blogs/manageBlogs"), {
  ssr: false,
  loading: () => {
    const array = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));
    return array.map((item) => (
        <div key={item.id} className="">
          <FramerMotion width="100%" height="250px" duration={0.5} />
        </div>
      ));
  },
});

const BlogPanel = () => {
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      <Suspense fallback={<FramerMotion width="100%" height="250px" duration={0.5} />}>
        <ManageBlogs />
      </Suspense>
    </div>
  );
};

export default BlogPanel;
