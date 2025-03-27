"use client";

import BlogsManagement from "@/hooks/blogsManagement";
import Image from "next/image";
import { IoSettingsSharp } from "react-icons/io5";
import Box from "../../toggle-box/toggleBox";
import Button from "../../button/Button";
import { MdDelete } from "react-icons/md";

const ManageBlogs = () => {
  const { myBlogs,deleteBlogs } = BlogsManagement();

  const onDelet = (id:string)=>{
    deleteBlogs(id)
  }

  return myBlogs?.map((blog) => (
    <div key={blog.id} className="px-2 bg-amber-100 rounded-lg cursor-pointer hover:bg-amber-50 duration-200 ">
      <div className="flex py-2 gap-2 items-center">
        <Image width={70} height={70} className="rounded-full" alt="image" src={blog.picture || "/svg/person.svg"} />
        <div className="flex w-full pr-4 justify-between items-start">
          <div className="flex flex-col">
            <p className="font-bold">{blog.username}</p>
            <p className="text-xs font-light">{blog.email}</p>
          </div>
          <Box
            childClass="p-2 shadow-2xl"
            possition="bottom-left"
            childrenItems={
              <Button onClick={() => onDelet(blog.id)} type="button" className="text-red-600 p-1 hover:text-red-800">
                <MdDelete size={20} />
              </Button>
            }
          >
            <IoSettingsSharp />
          </Box>
        </div>
      </div>
      <h2 className="text-xl py-2 px-2 font-extrabold">{blog.subject}</h2>
      <p className="text-xs font-light px-2 truncate py-2">{blog.about}</p>
    </div>
  ));
};

export default ManageBlogs;
