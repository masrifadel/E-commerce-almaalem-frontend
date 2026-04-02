"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/Contexts/AppContext";

type Product = {
  _id: string;
  name: string;
  price: number;
  description: string;
  url: string;
  quantity: number;
};

const Quantity = ({ product }: { product: Product }) => {
  const { setData } = useAppContext();
  // const [data, setData] = useState<Product[]>([]);
  const [quantitySelected, setQuantitySelected] = useState(1);

  const handleAddToCart = (product: Product) => {
    // Pure frontend cart management - no backend API calls needed
    setData((prev) => {
      // 1. Check if product is already in cart
      const itemExists = prev.find((item) => item._id === product._id);
      let updatedCart;
      if (itemExists) {
        // 2. Update quantity if item exists
        updatedCart = prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantitySelected }
            : item,
        );
      } else {
        // 3. Add new item if it doesn't exist
        updatedCart = [...prev, { ...product, quantity: quantitySelected }];
      }

      // 4. Save to localStorage for persistence
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });

    toast.success(product.name + " added to cart");
  };

  return (
    <div className="my-2">
      <div>
        <p className="text-white mb-2">Quantity:</p>
        <div className="flex items-center space-x-4">
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-lg font-bold cursor-pointer hover:bg-gray-300"
            onClick={() =>
              setQuantitySelected(Math.max(1, quantitySelected - 1))
            }
          >
            -
          </button>
          <span className="text-lg w-10 flex justify-center text-white">
            {quantitySelected}
          </span>
          <button
            className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded text-lg font-bold cursor-pointer hover:bg-gray-300"
            onClick={() => setQuantitySelected(quantitySelected + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        className="w-full bg-[#c27a2c] hover:bg-[#2e4a63] transition duration-300 text-white py-3 rounded-lg font-semibold tracking-wide shadow-lg mt-4"
        onClick={() => handleAddToCart(product)}
      >
        ADD TO CART
      </button>
    </div>
  );
};

export default Quantity;
