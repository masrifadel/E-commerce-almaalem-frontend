"use client";
import { useState, useEffect } from "react";
import { useAppContext } from "@/Contexts/AppContext";

type Category = { _id: string; name: string; path: string };

interface Product {
  _id?: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  available: boolean;
  isFeatured: boolean;
  categoryId: string | { _id: string; name: string; path: string };
  image?: string;
}

export default function ProductForm({
  editingProduct,
  onCancel,
}: {
  editingProduct?: Product | null;
  onCancel?: () => void;
}) {
  const { categories, refreshProducts } = useAppContext();
  const [localEditingProduct, setLocalEditingProduct] =
    useState<Product | null>(editingProduct || null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    available: true,
    isFeatured: false,
    categoryId: "",
    image: null as File | null,
  });

  // Update form when editingProduct prop changes
  useEffect(() => {
    if (editingProduct) {
      const categoryId =
        typeof editingProduct.categoryId === "string"
          ? editingProduct.categoryId
          : editingProduct.categoryId._id;

      setForm({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        originalPrice: editingProduct.originalPrice?.toString() || "",
        description: editingProduct.description,
        available: editingProduct.available,
        isFeatured: editingProduct.isFeatured,
        categoryId: categoryId || "",
        image: null as File | null,
      });
      setLocalEditingProduct(editingProduct);
    }
  }, [editingProduct]);

  const resetForm = () => {
    setForm({
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      available: true,
      isFeatured: false,
      categoryId: "",
      image: null as File | null,
    });
    setLocalEditingProduct(null);
    if (onCancel) onCancel();
  };

  const setFormForEdit = (product: Product) => {
    const categoryId =
      typeof product.categoryId === "string"
        ? product.categoryId
        : product.categoryId._id;

    setForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description,
      available: product.available,
      isFeatured: product.isFeatured,
      categoryId: categoryId || "",
      image: null as File | null,
    });
    setLocalEditingProduct(product);
  };

  const handleChange = (e: any) => {
    const { name, type, checked, value, files } = e.target;
    setForm({
      ...form,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("price", form.price);
    if (form.originalPrice)
      formData.append("originalPrice", form.originalPrice);
    formData.append("description", form.description);
    formData.append("available", form.available.toString());
    formData.append("isFeatured", form.isFeatured.toString());
    formData.append("categoryId", form.categoryId);
    if (form.image) formData.append("image", form.image);

    try {
      const url = localEditingProduct?._id
        ? `http://localhost:5001/api/products/${localEditingProduct._id}`
        : "http://localhost:5001/api/products";

      const method = localEditingProduct?._id ? "PUT" : "POST";

      // Debug: Log the form data being sent
      console.log("Sending product data:", {
        name: form.name,
        price: form.price,
        originalPrice: form.originalPrice,
        description: form.description,
        available: form.available.toString(),
        isFeatured: form.isFeatured.toString(),
        categoryId: form.categoryId,
        hasImage: !!form.image,
      });

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: "Bearer " + token,
        },
        body: formData,
      });

      if (response.ok) {
        console.log(
          `Product ${localEditingProduct?._id ? "updated" : "created"} successfully`,
        );
        resetForm();
        // Trigger global product refresh
        refreshProducts();
      } else {
        const errorData = await response.json();
        console.error("Error saving product:", errorData);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-yellow-500 mb-4">
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          name="price"
          placeholder="Price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          required
        />
        <input
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          name="originalPrice"
          placeholder="Original Price (optional)"
          type="number"
          step="0.01"
          value={form.originalPrice}
          onChange={handleChange}
        />
        <textarea
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          required
        />
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1 text-white">
            <input
              type="checkbox"
              name="isFeatured"
              checked={form.isFeatured}
              onChange={handleChange}
            />
            Featured
          </label>
          <label className="flex items-center gap-1 text-white">
            <input
              type="checkbox"
              name="available"
              checked={form.available}
              onChange={handleChange}
            />
            Available
          </label>
        </div>
        <select
          name="categoryId"
          value={form.categoryId || ""}
          onChange={handleChange}
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="p-2 rounded border border-gray-600 bg-gray-900 text-white"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-yellow-500 text-black font-semibold p-2 rounded hover:bg-yellow-400 transition flex-1"
          >
            {editingProduct ? "Update Product" : "Add Product"}
          </button>
          {editingProduct && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white font-semibold p-2 rounded hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
