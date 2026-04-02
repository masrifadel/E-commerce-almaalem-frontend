"use client";
import { useState, useEffect } from "react";

interface OrderItem {
  productId: {
    _id: string;
    name: string;
    url: string;
    price: number;
  };
  quantity: number;
  priceAtPurchase: number;
}

interface Order {
  _id: string;
  userId: {
    name: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  shippingAddress: {
    governorate: string;
    city: string;
    street: string;
    building: string;
    floor: number;
    directions?: string;
    phoneNumber: string;
  };
  status: "Pending" | "Paid";
  createdAt: string;
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Fresh deployment trigger - new day, new deployment

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Add fallback polling every 10 seconds as backup
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchOrders = async () => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        console.error("No admin token found");
        return;
      }

      console.log("Raw token:", token);
      console.log("Token found:", token ? "YES" : "NO");
      console.log("Token length:", token ? token.length : 0);
      console.log(
        "Token starts with Bearer:",
        token ? token.startsWith("Bearer ") : "N/A",
      );

      const response = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/checkout/admin/all",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        console.log("📊 Orders fetched:", data.length);
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (
    orderId: string,
    newStatus: "Pending" | "Paid",
  ) => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(
        `https://maalem-backend-ybme.onrender.com/api/checkout/admin/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );

      if (response.ok) {
        fetchOrders(); // Refresh the list
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-yellow-500 mb-4">
          Order Management
        </h3>
        <div className="text-gray-400">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-yellow-500 mb-4">
        Order Management
      </h3>

      {!orders || orders.length === 0 ? (
        <div className="text-gray-400">No orders found</div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-700 rounded-lg p-4 bg-gray-900 mb-4"
            >
              {/* Order Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-white font-medium">
                    Order #{order._id.slice(-8)}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {formatDate(order.createdAt)}
                  </div>
                  <div className="text-gray-400 text-sm">
                    Customer: {order.userId.name} ({order.userId.email})
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Paid"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  <div className="text-white font-bold">
                    ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mb-3">
                <div className="text-gray-400 text-sm mb-2">Items:</div>
                <div className="space-y-2">
                  {order.items.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 text-sm"
                    >
                      <img
                        src={
                          item.productId?.url
                            ? `https://maalem-backend-ybme.onrender.com${item.productId.url}`
                            : "/placeholder.png"
                        }
                        alt={item.productId?.name || "Product"}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="text-white">
                          {item.productId?.name || "Unknown Product"}
                        </div>
                        <div className="text-gray-400">
                          ${item.priceAtPurchase} x {item.quantity}
                        </div>
                      </div>
                      <div className="text-white">
                        ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-3">
                <div className="text-gray-400 text-sm mb-1">
                  Shipping Address:
                </div>
                <div className="text-white text-sm">
                  {order.shippingAddress.building}, Floor{" "}
                  {order.shippingAddress.floor}
                </div>
                <div className="text-white text-sm">
                  {order.shippingAddress.street}, {order.shippingAddress.city}
                </div>
                <div className="text-white text-sm">
                  {order.shippingAddress.governorate}
                </div>
                <div className="text-white text-sm">
                  Phone: {order.shippingAddress.phoneNumber}
                </div>
                {order.shippingAddress.directions && (
                  <div className="text-gray-400 text-sm mt-1">
                    Directions: {order.shippingAddress.directions}
                  </div>
                )}
              </div>

              {/* Status Update */}
              <div className="flex gap-2">
                {order.status === "Pending" && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "Paid")}
                    className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                  >
                    Mark as Paid
                  </button>
                )}
                {order.status === "Paid" && (
                  <button
                    onClick={() => updateOrderStatus(order._id, "Pending")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 transition"
                  >
                    Mark as Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
