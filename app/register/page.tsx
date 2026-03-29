"use client";
import { useState } from "react";
import register from "../assets/register.webp";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";

const Register = () => {
  const { setData } = useAppContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/user/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const token = localStorage.getItem("token");
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");

      const cartResponse = await fetch("http://localhost:5001/api/cart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: localCart,
        }),
      });

      const cartData = await cartResponse.json();
      console.log("cartData", cartData);
      setData(cartData.cart.items);
      localStorage.removeItem("cart");
      router.push("profile");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
    console.log(name, email, password);
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2  flex justify-center items-center p-4 md:p-0">
        <div className="flex flex-col items-center justify-center border-sm shadow-sm p-8 rounded">
          {/* Login details */}
          <h2 className="text-xl font-medium text-center mb-6 text-[#c27a2c]">
            المعلم
          </h2>
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Hey there! 👋
          </h2>
          <p className="text-center mb-6 text-white">
            Enter your username and password to Sign Up
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-semibold mb-2  text-white "
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded outline-none text-black bg-white"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-white "
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded outline-none  text-black bg-white"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="text-white block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                minLength={8}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" text-black bg-white w-full p-2 border rounded outline-none"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-[#c27a2c] w-full p-2 rounded-lg dont-semibold hover:bg-[#2e4a63] transition cursor-pointer mt-4"
            >
              Sign Up
            </button>
            <p className="mt-6 text-center text-sm text-white">
              Alread have an account?
              <span>
                <Link
                  href={`/login?redirect=${redirectTo}`}
                  className="text-blue-500 ml-1"
                >
                  Login
                </Link>
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden md:block w-1/2">
        {/* Image */}
        <img
          src="/Logo.png"
          alt="Login Image"
          className="h-[480px] w-full h-full object-cover"
        />
      </div>
    </div>
  );
};
export default Register;
