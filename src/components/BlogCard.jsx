import { LuArrowRight } from "react-icons/lu";
import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const { title, content, image, _id } = blog;
  return (
    <div className="w-96 h-[450px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg h-3/5 w-full object-cover"
        src={image}
        alt=""
      />

      <div className="p-5">
        <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 line-clamp-1">
          {title}
        </h5>

        <p
          className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <Link
          to={`/details/${_id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 gap-2"
        >
          Read more
          <LuArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
