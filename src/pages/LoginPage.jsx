import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

const LoginPage = () => {
  const validationSchema = Yup.object({
    email: Yup.string().email("Indvalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-8 w-96 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-8 text-center">Welcome Back</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <input
              className="border p-2 rounded outline-none w-full"
              type="email"
              id="email"
              {...formik.getFeildProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 textm-sm mt-1">
                {formik.errors.email}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <input
              className="border p-2 rounded outline-none w-full"
              type="password"
              id="password"
              {...formik.getFeildProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 textm-sm mt-1">
                {formik.errors.password}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="bg-brand p-2 w-full text-semibold text-white rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
