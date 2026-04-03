"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAppContext } from "@/Contexts/AppContext";
const page = () => {
  const router = useRouter();
  const {
    setFetchData,
    fetchData,
    setData,
    data, // Cart items from context
    refreshTrigger,
    setRefreshTrigger,
  } = useAppContext();
  interface CitiesData {
    [key: string]: string[]; // This is "Index Signature" TypeScript is asking for
  }

  // Simple guest checkout - no cart API needed
  useEffect(() => {
    console.log("Checkout page loaded with cart items:", data?.length || 0);
  }, [data]);

  const citiesByGovernorate: CitiesData = {
    Beirut: [
      "Achrafieh",
      "Hamra",
      "Verdun",
      "Ras Beirut",
      "Gemmayze",
      "Mar Mikhael",
      "Badaro",
      "Mazraa",
      "Tariq El Jdideh",
    ],
    "Mount Lebanon": [
      "Baabda",
      "Hazmieh",
      "Dahyeh",
      "Aley",
      "Broummana",
      "Jounieh",
      "Dbayeh",
      "Antelias",
      "Zalka",
      "Zouk Mosbeh",
      "Zouk Mikael",
      "Byblos",
      "Keserwan",
      "Metn",
      "Choueifat",
      "Aramoun",
    ],
  };

  const [shippingAddress, setShippingAddress] = useState({
    governorate: "Mount Lebanon",
    city: "",
    street: "",
    building: "",
    floor: "",
    directions: "",
    phoneNumber: "",
    name: "", // Add name field
    saveAddress: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    try {
      const res = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/checkout",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            shippingAddress,
            items: data, // Correct property name from AppContext
          }),
        },
      );
      const orderData = await res.json();
      if (orderData) {
        console.log("✅ Order placed successfully!");
        console.log("Order data:", orderData);
        console.log("Order ID:", orderData._id);
        console.log("Order.order:", orderData.order);

        // Clear cart
        setData([]);
        setFetchData((prev) => !prev);
        setRefreshTrigger(!refreshTrigger);

        // Navigate to receipt page using correct order ID
        const orderId = orderData._id || orderData.order?._id || orderData.id;
        console.log("🎯 Navigating to receipt with ID:", orderId);

        if (orderId) {
          router.push(`/receipt/${orderId}`);
        } else {
          console.error("❌ Order ID not found in response");
          toast.error("Order created but couldn't navigate to receipt");
        }
      } else {
        console.error("❌ Order creation failed:", orderData);
        toast.error(orderData.message || "Failed to place order");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: val,
    }));
  };
  const availableCities =
    citiesByGovernorate[shippingAddress.governorate] || [];

  return (
    <div className="flex justify-center items-center py-4">
      <div className="flex flex-col sm:flex-row">
        <div className="bg-[#c27a2c] p-2 rounded">
          <h1 className="text-2xl font-bold border-b-2 border-white pb-2 mb-4 text-white ">
            Shipping Address
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[#2e4a63] font-semibold text-lg">
                Full Name*
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={shippingAddress.name}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-[#c27a2c] focus:outline-none placeholder:text-gray-300
                  autofill:shadow-[0_0_0_30px_#2e4a63_inset] [-webkit-text-fill-color:white]"
                required
              />
            </div>
            <div>
              <label className="text-[#2e4a63] font-semibold text-lg">
                Governorate*
              </label>
              <select
                name="governorate"
                value={shippingAddress.governorate}
                onChange={handleChange}
                required
                className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-white focus:outline-none"
              >
                <option value="Beirut" className="text-[#c27a2c]">
                  Beirut
                </option>
                <option value="Mount Lebanon" className="text-[#c27a2c]">
                  Mount Lebanon
                </option>
              </select>
            </div>
            <div>
              <label className="text-[#2e4a63] font-semibold text-lg">
                City*
              </label>
              <select
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-white focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select a city
                </option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#2e4a63] font-semibold">Street*</label>
                <input
                  type="text"
                  name="street"
                  placeholder="Main St / Square Name"
                  value={shippingAddress.street}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-[#c27a2c] focus:outline-none placeholder:text-gray-300
                  autofill:shadow-[0_0_0_30px_#2e4a63_inset] [-webkit-text-fill-color:white]"
                  required
                />
              </div>
              <div>
                <label className="text-[#2e4a63] font-semibold">
                  Building*
                </label>
                <input
                  type="text"
                  name="building"
                  placeholder="Bldg Name/Block"
                  value={shippingAddress.building}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-white placeholder:text-[#c27a2c] focus:outline-none autofill:shadow-[0_0_0_30px_#2e4a63_inset] [-webkit-text-fill-color:white]"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[#2e4a63] font-semibold">Floor*</label>
                <input
                  type="number"
                  name="floor"
                  placeholder="e.g. 4th Floor"
                  value={shippingAddress.floor}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-white focus:outline-none placeholder:text-[#c27a2c] autofill:shadow-[0_0_0_30px_#2e4a63_inset] [-webkit-text-fill-color:white]"
                  required
                />
              </div>
              <div>
                <label className="text-[#2e4a63] font-semibold">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="70 123 456"
                  value={shippingAddress.phoneNumber}
                  onChange={handleChange}
                  className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow focus:outline-none text-white focus:outline-none placeholder:text-[#c27a2c] autofill:shadow-[0_0_0_30px_#2e4a63_inset] [-webkit-text-fill-color:white]"
                  required
                />
              </div>
            </div>

            {/* Row 4: Directions (Full Width) */}
            <div>
              <label className="text-[#2e4a63] font-semibold">
                Extra Directions
              </label>
              <textarea
                name="directions"
                rows={3}
                placeholder="Landmarks, nearby shops, etc."
                value={shippingAddress.directions}
                onChange={handleChange}
                className="w-full p-2 mt-1 bg-[#2e4a63] rounded shadow text-white placeholder:text-[#c27a2c] autofill:shadow-[0_0_0_30px_#2e4a63_inset] [-webkit-text-fill-color:white] focus:outline-none resize-none"
              />
            </div>
            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="saveAddress"
                name="saveAddress"
                checked={shippingAddress.saveAddress}
                onChange={handleChange}
                className="w-5 h-5 cursor-pointer accent-white"
              />
              <label
                htmlFor="saveAddress"
                className="text-white font-medium cursor-pointer select-none"
              >
                Save address for future orders
              </label>
            </div>
            <div className=" flex justify-center items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-fit px-6 py-2 text-white bg-[#2e4a63] hover:bg-white hover:text-[#c27a2c] font-bold rounded-lg mt-4 hover:bg-opacity-90 transition-all duration-300 cursor-pointer shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
