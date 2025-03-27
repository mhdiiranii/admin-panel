"use client";

import { blogsManagement, blogType } from "@/models/types";
import { deleteSwitchBlogs, getPanelBlogs } from "@/services/Blogs";
import { useMemo, useState } from "react";

const BlogsManagement: blogsManagement = () => {
  const [myBlogs, setMyBlogs] = useState<blogType | null>(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [blogStatus, setBlogStatus] = useState<boolean | null>();
  const [refresh, setRefresh] = useState<boolean>(false);

  useMemo(() => {
    setLoading(true);
    getPanelBlogs()
      .then((res) => setMyBlogs(res.data))
      .catch((err) => console.log(err));
  }, [refresh]);
  
  const deleteBlogs = (id: string) => {
    setLoading(true);
    setBlogStatus(null);
    setRefresh(() => (refresh ? false : true));
    deleteSwitchBlogs(id)
      .then((res) => {
        setLoading(false);
        setBlogStatus(res?.ok);
      })
      .catch((err) => {
        setBlogStatus(null);
        console.error(err.message);
      });
  };

  return {
    myBlogs,
    loading,
    deleteBlogs,
    blogStatus,
  };
};

export default BlogsManagement;
