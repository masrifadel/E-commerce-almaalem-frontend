"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";

function LoginContent() {
  const { setData } = useAppContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fixed admin credentials
  const ADMIN_EMAIL = "maalem@example.com";
  const ADMIN_PASSWORD = "password";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Simple admin authentication
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // Set admin token
        localStorage.setItem("token", "admin_token_" + Date.now());
        localStorage.setItem(
          "user",
          JSON.stringify({
            name: "Admin User",
            email: ADMIN_EMAIL,
            role: "admin",
          }),
        );

        // Clear cart and redirect to admin
        localStorage.removeItem("cart");
        setData([]);
        router.push("/admin");
      } else {
        setError("Invalid admin credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#c27a2c]">
      <div className="w-full sm:w-1/2 flex justify-center items-center p-2 sm:p-0">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#c27a2c] mb-2">
                Admin Login
              </h1>
              <p className="text-gray-600 mb-6">
                Al Maalem Restaurant Admin Panel
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c27a2c]"
                  placeholder="Enter admin email"
                  defaultValue={ADMIN_EMAIL}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c27a2c]"
                  placeholder="Enter admin password"
                  defaultValue={ADMIN_PASSWORD}
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#c27a2c] hover:bg-[#2e4a63] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#c27a2c] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return <LoginContent />;
}
