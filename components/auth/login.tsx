"use client";

// import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

interface LoginFormType {
  emailOrUsername: string;
  password: string;
}

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
    emailOrUsername: "admin@admin.com",
    password: "admin",
  };

  const handleLogin = useCallback(
    async (values: LoginFormType) => {
      const isSuccess = await login({
        email: values.emailOrUsername, // If it's an email
        username: values.emailOrUsername, // If it's a username
        password: values.password,
      });
      if (isSuccess) {
        // await createAuthCookie();
        router.replace("/");
      } else {
        notify();
      }
    },
    [router]
  );

  return (
    <div className="flex min-h-screen items-center justify-center ">
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
                  label="Email or Username"
                  type="text"
                  value={values.emailOrUsername}
                  isInvalid={!!errors.emailOrUsername && !!touched.emailOrUsername}
                  errorMessage={errors.emailOrUsername}
                  onChange={handleChange("emailOrUsername")}
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
      </div>
    </div>
  );
};