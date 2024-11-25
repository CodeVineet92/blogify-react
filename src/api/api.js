import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-backend-plum-five.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchBlogs = async () => {
  return api.get("/api/blog");
};

export const fetchBlogById = async (id) => {
  return api.get(`/api/blog/${id}`);
};

export const loginUser = async (loginData) => {
  return api.post("/api/user/login", loginData);
};

export const fetchBlogByUser = async (userId) => {
  return api.get(`api/blog/user/${userId}`);
};

export const createPost = async (blogData) => {
  console.log(blogData);
  return api.post("api/blog", blogData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePost = async (id) => {
  return api.delete(`/api/blog/${id}`);
};

export const updatePost = async (id, postData) => {
  return api.put(`/api/blog/${id}`, postData);
};

// Added function
export const signupUser = async (signupData) => {
  return api.post("/api/user/signup", signupData);
};
