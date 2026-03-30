"use client";
import { useState } from "react";
import { useAppContext } from "@/Contexts/AppContext";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  // const [path, setPath] = useState("");

  const { refreshCategories } = useAppContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("path", name.toLowerCase().replace(" ", "-"));
    if (image) formData.append("image", image);

    console.log("Category:", name, image);
    console.log("Token:", token);
    // send to API
    try {
      const response = await fetch("http://localhost:5001/api/category", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });
      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        return;
      }

      const result = await response.json();
      console.log("Success:", result);

      // Reset form
      setName("");
      setImage(null);

      // Trigger global refresh
      refreshCategories();
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-yellow-500 mb-4">
        Manage Categories
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        <button className="bg-yellow-500 text-black font-semibold p-2 rounded hover:bg-yellow-400 transition">
          Add Category
        </button>
      </form>
    </div>
  );
}
