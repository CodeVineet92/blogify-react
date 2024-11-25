// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { signupUser } from "@/api/api"; // Ensure this path is correct
import { addUser } from "@/store/userSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const { name, email, password } = values;
      const response = await signupUser({ name, email, password });
      const { user, token } = response.data;
      dispatch(addUser({ id: user.id, token }));
      navigate("/welcome"); // Redirect to a welcome or home page
      console.log(response.data);
    } catch (err) {
      // You can extract more detailed error messages from err.response if available
      setError(
        err.response?.data?.message ||
          "Signup failed. Please try again."
      );
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-8 text-center">Create an Account</h1>
        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="name">
              Name
            </label>
            <input
              className={`border p-2 rounded outline-none w-full ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="text"
              id="name"
              {...formik.getFieldProps("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className={`border p-2 rounded outline-none w-full ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="email"
              id="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className={`border p-2 rounded outline-none w-full ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="password"
              id="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className={`border p-2 rounded outline-none w-full ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              type="password"
              id="confirmPassword"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-brand p-2 w-full font-semibold text-white rounded hover:bg-brand-dark transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;

