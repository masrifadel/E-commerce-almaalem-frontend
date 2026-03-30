"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";

const Login = () => {
  const { setData } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  // This grabs "/profile" from the URL if it exists
  const redirectTo = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/user/signin", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const token = localStorage.getItem("token");
      const localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const localUser = JSON.parse(localStorage.getItem("user") || "");

      console.log("Looooocallll Cart", localCart);

      const cartResponse = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/cart",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            items: localCart,
          }),
        },
      );

      const cartData = await cartResponse.json();
      console.log("cartData", cartData);
      setData(cartData.cart.items);
      localStorage.removeItem("cart");
      if (localUser?.role === "user") {
        router.push("profile");
      } else if (localUser?.role === "admin") {
        router.push("maalem");
      }
      router.refresh();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex">
      <div className="w-full sm:w-1/2  flex justify-center items-center p-2 sm:p-0">
        <div className="flex flex-col items-center justify-center border-sm shadow-sm p-8 rounded">
          {/* Login details */}
          <h2 className="text-xl font-medium text-center mb-6 text-[#c27a2c]">
            المعلم
          </h2>
          <h2 className="text-2xl font-bold text-center mb-6 text-white">
            Hey there! 👋
          </h2>
          <p className="text-center mb-6 text-white">
            Enter your username and password to login
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-semibold mb-2 text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded outline-none text-black bg-white"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-semibold mb-2 text-white"
              >
                Password
              </label>
              <input
                type="password"
                minLength={8}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded outline-none  text-black bg-white"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-[#c27a2c] hover:bg-[#2e4a63] w-full p-2 rounded-lg dont-semibold transition cursor-pointer mt-4"
            >
              Sign In
            </button>
            <p className="mt-6 text-center text-sm text-white">
              Don't have an account?
              <span>
                <Link
                  href={`/register?redirect=${redirectTo}`}
                  className="text-blue-500 ml-1"
                >
                  Register
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
          className="h-[480px] w-full object-cover"
        />
      </div>
    </div>
  );
};
export default Login;
