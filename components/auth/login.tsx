"use client";

import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

export const Login = ({ children }: any) => {
  const router = useRouter();
  const { login } = useAuth();
  const notify = () =>
    toast.error("Login Failed!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      style: {
        zIndex: 9999999, 
      },
    });

  const initialValues: LoginFormType = {
    email: "m@m.com",
    password: "123",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      const isSuccess = await login({
        email: values.email,
        password: values.password,
      });
      if (isSuccess) {
        await createAuthCookie();
        router.replace("/");
      } else {
        notify();
      }
    },
    [router]
  );

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <ToastContainer />
      <div className="bg-white shadow-lg rounded-xl p-12 w-[100%] max-w-screen-xl">
        <div className="text-center text-4xl font-bold mb-8 text-black">Log in or sign up</div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ values, errors, touched, handleChange, handleSubmit }) => (
            <>
              <div className="flex flex-col gap-6 mb-8">
                <Input
                  variant="bordered"
                  label="Email"
                  type="email"
                  value={values.email}
                  isInvalid={!!errors.email && !!touched.email}
                  errorMessage={errors.email}
                  onChange={handleChange("email")}
                  className="w-full text-black"
                />
                <Input
                  variant="bordered"
                  label="Password"
                  type="password"
                  value={values.password}
                  isInvalid={!!errors.password && !!touched.password}
                  errorMessage={errors.password}
                  onChange={handleChange("password")}
                  className="w-full text-black"
                />
              </div>

              <Button
                onPress={() => handleSubmit()}
                variant="ghost"
                color="danger"
                className="w-full text-lg"
              >
                Login
              </Button>
            </>
          )}
        </Formik>

        <div className="font-light text-gray-500 mt-6 text-center">
        {children}
        </div>
        {/* <div className="font-light text-gray-500 mt-6 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-red-500">
            Register here
          </Link>
        </div> */}
        
      </div>

      
    </div>
  );
};