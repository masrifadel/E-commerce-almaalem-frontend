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
  const { setData, data } = useAppContext();
  // const [data, setData] = useState<Product[]>([]);
  const [quantitySelected, setQuantitySelected] = useState(1);

  const handleAddToCart = async (product: Product) => {
    const token = localStorage.getItem("token");
    try {
      if (token) {
        const res = await fetch(
          "https://maalem-backend-ybme.onrender.com/api/cart/addProduct",
          {
            method: "POST",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId: product._id,
              quantity: quantitySelected,
            }),
          },
        );
        const AddedCart = await res.json();
        console.log("AddedCart ======================== >", AddedCart);
        setData(AddedCart.cart.items);
      } else {
        setData((prev = []) => {
          // 1. Check if the product is already in the cart
          const itemExists = prev.find((item) => item._id === product._id);
          let updatedCart;
          if (itemExists) {
            // 2. EQUIVALENT TO: data[i].quantity += quantitySelected
            updatedCart = prev.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + quantitySelected }
                : item,
            );
          } else {
            updatedCart = [...prev, { ...product, quantity: quantitySelected }];
          }
          // 3. EQUIVALENT TO: if(i === data.length - 1) { return [...prev, newItem] }
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        });
      }
      toast.success(product.name + " added to the cart");
    } catch (err) {
      console.log(err);
    }
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
