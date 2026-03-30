"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const ReceiptPage = () => {
  const params = useParams();

  const [fetchedOrder, setFetchedOrder] = useState<any>({});
  const [myUser, setMyUser] = useState<{
    name: string;
    email: string;
    role: string;
  }>({
    name: "",
    email: "",
    role: "",
  });

  const entityId = params.id;

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || "{}";
    console.log(
      "DEBUG - Raw String from Storage:",
      typeof JSON.parse(storedUser),
    );
    const username = JSON.parse(storedUser);
    console.log("username", username);
    setMyUser(username);
    console.log("myUser", myUser);

    // 1. Prevent fetching if the ID isn't available yet
    if (!entityId) return;
    const token = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("user") || "{}");

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://maalem-backend-ybme.onrender.com/api/checkout/${entityId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const result = await response.json();
        console.log("HHHHEUHUHUHUH");
        setFetchedOrder(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
      }
    };

    fetchData();

    // 2. Dependency Array: This triggers the effect whenever entityId changes
  }, [entityId]);

  console.log("fetchedOrder", fetchedOrder);

  const order = {
    id: "ORD-1024",
    date: "March 29, 2026",
    customer: "Fadel",
    items: [
      { name: "Zinger Burger", qty: 2, price: 8 },
      { name: "Fries", qty: 1, price: 3 },
      { name: "Pepsi", qty: 2, price: 2 },
    ],
    shipping: 2,
    paymentMethod: "Cash on Delivery",
  };

  const subtotal = order.items.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const total = subtotal + order.shipping;

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center px-4">
      <div className="w-full max-w-2xl bg-[#b87333] rounded-xl shadow-lg p-6 md:p-8">
        {/* Header */}
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Order Receipt
        </h1>
        <p className="text-gray-200 text-sm mb-6">Thank you for your order!</p>

        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-white">
          <p>
            <span className="font-semibold">Order ID:</span>{" "}
            {fetchedOrder?._id?.slice(0, 4)}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(fetchedOrder.createdAt).toLocaleDateString()}
          </p>
          <p>
            <span className="font-semibold">Customer:</span> {myUser?.name}
          </p>
          <p>
            <span className="font-semibold">Payment:</span> Cash on Delivery
          </p>
        </div>

        {/* Items */}
        <div className="bg-[#2f4f6f] rounded-lg p-4 mb-6">
          <h2 className="text-white font-semibold mb-3">Items</h2>

          {fetchedOrder?.items?.map((item: any, index: number) => (
            <div
              key={index}
              className="flex justify-between text-gray-200 border-b border-gray-500 py-2"
            >
              <span>
                {item.productId.name} x{item.quantity}
              </span>
              <span>${item.productId.price * item.quantity}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="text-white space-y-2 mb-6">
          {/* <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div> */}

          {/* <div className="flex justify-between">
            <span>Shipping</span>
            <span></span>
          </div> */}

          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total</span>
            <span>${fetchedOrder.totalAmount}</span>
          </div>
        </div>

        {/* Button */}
        <div className="flex gap-2">
          <Link
            href="/profile"
            className="w-full bg-[#2f4f6f] text-center hover:bg-[#1e3a56] text-white py-3 rounded-lg transition"
          >
            Show Orders
          </Link>
          <Link
            href="/"
            className="w-full text-center bg-[#2f4f6f] hover:bg-[#1e3a56] text-white py-3 rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPage;
