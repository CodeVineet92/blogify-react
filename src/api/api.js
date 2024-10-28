import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-backend-plum-five.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchBlogs = async () => {
  return api.get("/api/blog");
};

export const fetchBlogById = async (id) => {
  return api.get(`/api/blog/${id}`);
};

export const loginUser = async (loginData) => {
  return api.post("/api/user/login", loginData);
};
