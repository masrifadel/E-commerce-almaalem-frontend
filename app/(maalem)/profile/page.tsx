"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";
import MyOrdersPage from "./MyOrdersPage";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const Profile = () => {
  const { setData, ordersLoading } = useAppContext();
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; email?: string }>({});
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const savedToken = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const fetchorders = async () => {
      try {
        const res = await fetch(
          "https://maalem-backend-ybme.onrender.com/api/checkout",
          {
            headers: { Authorization: `Bearer ${savedToken}` },
          },
        );
        const result = await res.json();
        setOrders(result);
      } catch (err) {
        console.log(err);
      }
    };
    fetchorders();
  }, []);

  console.log("Orders", orders);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    setData([]);
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4 md:p-6 flex flex-col md:flex-row space-y-6 md:space-x-6 md:space-y-0">
      <div className="rounded-lg shadow-md bg-[#2e4a63] p-6 w-full md:w-1/3 lg:w-1/4 self-start">
        <h1 className="font-bold text-2xl md:text-3xl mb-4 text-white">
          {user?.name || "User"}
        </h1>
        <p className="text-lg text-white mb-4">{user.email || "No email"}</p>
        <button
          className="bg-[#c27a2c] w-full rounded py-2 px-4 text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="w-full md:w-2/3 lg:w-3/4">
        {ordersLoading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner size="large" />
            <p className="text-white text-lg mt-4">Loading your orders...</p>
          </div>
        ) : (
          <MyOrdersPage orders={orders} />
        )}
      </div>
    </div>
  );
};

export default Profile;
