"use client";
import { useAppContext } from "@/Contexts/AppContext";
import { useState } from "react";

interface Category {
  _id?: string;
  id?: number;
  name: string;
  path: string;
  image?: string;
}

export default function CategoryList() {
  const { categories, refreshCategories } = useAppContext();
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState<File | null>(null);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setEditName(category.name);
    setEditImage(null);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditName("");
    setEditImage(null);
  };

  const handleSaveEdit = async () => {
    if (!editingCategory?._id) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const formData = new FormData();
    formData.append("name", editName);
    formData.append("path", editName.toLowerCase().replace(" ", "-"));
    if (editImage) formData.append("image", editImage);

    try {
      const response = await fetch(
        `http://localhost:5001/api/category/${editingCategory._id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + token,
          },
          body: formData,
        },
      );

      if (response.ok) {
        refreshCategories();
        handleCancelEdit();
      } else {
        const errorData = await response.json();
        console.error("Error updating category:", errorData);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async (categoryId: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const response = await fetch(
        `http://localhost:5001/api/category/${categoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (response.ok) {
        refreshCategories();
      } else {
        const errorData = await response.json();
        console.error("Error deleting category:", errorData);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-yellow-500 mb-2">
        Category List
      </h3>
      <div className="flex flex-col gap-2">
        {categories.length === 0 ? (
          <div key="no-categories" className="text-gray-400">
            No categories found
          </div>
        ) : (
          categories.map((cat: Category) => (
            <div
              key={cat._id || cat.id || cat.path}
              className="flex justify-between items-center p-2 bg-gray-900 rounded"
            >
              {editingCategory?._id === cat._id ? (
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 p-1 rounded border border-gray-600 bg-gray-800 text-white"
                    placeholder="Category name"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditImage(e.target.files?.[0] || null)}
                    className="text-xs text-gray-400"
                  />
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-white">{cat.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="border border-yellow-500 text-yellow-500 px-2 py-1 rounded hover:bg-yellow-500 hover:text-black transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id!)}
                      className="border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
