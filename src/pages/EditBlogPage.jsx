import { fetchBlogById, updatePost } from "@/api/api";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

const EditBlogPage = () => {
  const location = useLocation();
  const blogData = location.state?.blog;

  const navigate = useNavigate();

  const [isLoading, setIsloading] = useState({});
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title);
      setValue(blogData.content);
      setCategory(blogData.category);
      setPreviewImage(blogData.image);
    }
  }, [blogData]);

  const removeImage = () => {
    setImage(null);
    setPreviewImage(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);
  };

  const handleSubmit = async () => {
    console.log("is updating");
    setIsloading(true);
    if (!title || !value || !category) {
      alert("please fill all the required fields");
    }
    const userId = blogData.user._id;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", value);
    formData.append("image", image);
    formData.append("user", userId);
    const id = blogData._id;

    try {
      const response = await updatePost(id, formData);
      if (response.status === 201 || response.status === 200) {
        setTitle("");
        setCategory("");
        setImage(null);
        setPreviewImage(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <div className="p-8 h-full bg-gray-100">
      <h1 className="text-2xl text-center font-semibold mb-8">
        Edit Blog Post
      </h1>

      <div className="bg-white p-8 rounded-md drop-shadow-md">
        <label htmlFor="title" className="text-xl font-semibold">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="w-full bg-transparent border p-2 outline-none rounded-md mb-4"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <label htmlFor="category" className="text-xl font-semibold">
          Category:
        </label>
        <select
          name="category"
          id="category"
          className="w-full bg-transparent border p-2 outline-none rounded-md mb-4"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Finance">Finance</option>
        </select>

        <label htmlFor="image" className="text-xl font-semibold">
          Image:
        </label>

        {previewImage ? (
          <div className="relative w-full max-w-lg mb-4">
            <img src={previewImage} className="w-full rounded-md h-auto" />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
            >
              ✕
            </button>
          </div>
        ) : (
          <input
            id="image"
            type="file"
            accept="image/*"
            className="w-full bg-transparent border p-2 outline-none rounded-md mb-4"
            onChange={handleImageChange}
          />
        )}

        <label className="text-xl font-semibold" htmlFor="content">
          Content:{" "}
        </label>
        <ReactQuill
          className=" rounded-md"
          theme="snow"
          value={value}
          onChange={setValue}
          style={{ height: "300px", borderRadius: "12px" }}
        />
        <button
          onClick={handleSubmit}
          className="bg-black text-white font-bold px-8 py-4 rounded-md mt-16 hover:bg-black/90"
        >
          Update Post
        </button>
      </div>
    </div>
  );
};

export default EditBlogPage;
