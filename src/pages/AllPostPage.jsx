import { fetchBlogByUser } from "@/api/api";
import BlogCard from "@/components/BlogCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllPostPage = () => {
  const userId = useSelector((state) => state.auth.user.id);
  const [blogs, setBlogs] = useState([]);
  console.log(userId);

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetchBlogByUser(userId);
      const data = response.data;
      setBlogs(data.blogs);
      console.log(data);
    };

    getAllPosts();
  }, []);
  return (
    <div className="grid grid-cols-3 space-y-6 w-full p-4">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default AllPostPage;
