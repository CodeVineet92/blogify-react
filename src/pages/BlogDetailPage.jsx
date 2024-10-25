import React, { useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  return (
    <div>
      {/* <h1>{title}</h1>
      <h3>{date}</h3>
      <img src={img} alt="" />
      <p dangerouslySetInnerHTML={{ __html: content }}></p> */}
    </div>
  );
};

export default BlogDetailPage;
