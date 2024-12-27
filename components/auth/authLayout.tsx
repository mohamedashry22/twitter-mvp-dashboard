"use client";

import { Image } from "@nextui-org/react";
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import Link from "next/link";


export const AuthLayoutWrapper = ({props}: any) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="flex h-screen">
      {/* Left Section with Gradient */}
      <div className="flex-1 flex-col flex items-center justify-center p-6 relative">
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            className="w-full h-full"
            src="https://nextui.org/gradients/docs-right.png"
            alt="gradient"
          />
        </div>

        {/* Sliding Animation Container */}
        <div className="relative w-full max-w-lg overflow-hidden shadow-lg rounded-xl z-10">
          <div
            className={`flex w-[200%] transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(${isLogin ? "0" : "-50%"})`,
            }}
          >
            {/* Login Component */}
            <div className="w-1/2 flex-shrink-0">
              <Login  >

              <div>
<span className="text-black">{isLogin ? "Don’t have an account?" : "Already have an account?"}</span>
<Link
href="#"
onClick={(e) => {
e.preventDefault();
toggleAuth();
}}
>
<span className="text-red-500">{isLogin ? " Sign Up" : " Login here"}</span>
</Link>
</div>
              </Login>

                {/* Toggle Button */}




            </div>

            {/* Register Component */}
            <div className="w-1/2 flex-shrink-0">
              <Register >
<div className="">
<span className="text-black">{isLogin ? "Don’t have an account?" : "Already have an account?"}</span>
<Link
href="#"
onClick={(e) => {
e.preventDefault();
toggleAuth();
}}
>
<span className="text-red-500">{isLogin ? " Sign Up" : " Login here"}</span>
</Link>
</div>
                </Register>

                {/* Toggle Button */}
         
            </div>



          </div>

        
        </div>
      </div>
    </div>
  );
};