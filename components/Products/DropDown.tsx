"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";

const DropDown = () => {
  const params = useParams();
  const category = params.category as string;

  const [open, setOpen] = useState(false);

  const options = ["All", "Sandwiches", "Burgers", "Plates", "Sides&Sodas"];

  const { categories } = useAppContext();

  const formatCategory = (cat?: string) => {
    if (!cat) return "All";
    const decoded = decodeURIComponent(cat);
    return decoded
      .replaceAll("&", " & ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const toSlug = (option: string) =>
    option.toLowerCase().replaceAll(" & ", "&").replaceAll(" ", "");

  const selected = formatCategory(category);

  return (
    <>
      <h1 className="text-xl font-bold text-[#c27a2c]">Menu</h1>

      <p className="text-sm text-gray-500 mt-1">
        {selected} <span>Items</span>
      </p>

      <div className="relative flex justify-end flex-grow">
        <button
          onClick={() => setOpen(!open)}
          className="border border-[#2e4a63] bg-[#c27a2c] text-white text-lg px-3 py-1 rounded mb-1"
        >
          {selected}
          <span
            className={`inline-block transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {open && (
          <div className="absolute top-full right-0 mt-1 w-40 bg-white border rounded-lg shadow-lg z-50">
            {categories.map((option, index) => (
              <Link
                key={index}
                href={`/menu/${toSlug(option.path)}`}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm ${
                  selected === option.name
                    ? "bg-[#c27a2c] text-white"
                    : "text-[#2e4a63] hover:bg-gray-100"
                }
                ${index === options.length - 1 ? "rounded-b-lg" : ""}
                ${index === 0 ? "rounded-t-lg" : ""}
                `}
              >
                {option.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DropDown;
