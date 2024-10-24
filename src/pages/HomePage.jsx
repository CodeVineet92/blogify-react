import { fetchBlogs } from "@/api/api";
import BlogCard from "@/components/BlogCard";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getAllBlogs = async () => {
      const response = await fetchBlogs();
      setBlogs(response.data.blogs);
    };
    getAllBlogs();
  }, []);
  return (
    <div className="grid grid-cols-3 space-y-6 w-full p-4">
      {blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default HomePage;
