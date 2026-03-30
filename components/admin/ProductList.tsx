"use client";
import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import { useAppContext } from "@/Contexts/AppContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  available: boolean;
  isFeatured: boolean;
  categoryId: {
    _id: string;
    name: string;
    path: string;
  };
  image?: string;
  url?: string;
}

export default function ProductList() {
  const { products, categories } = useAppContext();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const getCategoryName = (categoryId: any) => {
    if (typeof categoryId === "string") {
      // Fallback for string categoryId
      const category = categories.find(
        (cat) => (cat as any)._id === categoryId,
      );
      return category?.name || "Unknown Category";
    } else if (categoryId && categoryId.name) {
      // Populated category object
      return categoryId.name;
    }
    return "Unknown Category";
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      const response = await fetch(
        `http://localhost:5001/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (response.ok) {
        // Global refresh will be triggered by localStorage signal
        console.log("Product deleted successfully");
      } else {
        const errorData = await response.json();
        console.error("Error deleting product:", errorData);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleFormCancel = () => {
    setEditingProduct(null);
  };

  if (editingProduct) {
    return (
      <div className="bg-gray-800 p-4 rounded-lg shadow-md">
        <ProductForm
          editingProduct={editingProduct}
          onCancel={handleFormCancel}
        />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-yellow-500 mb-2">
        Product List
      </h3>
      <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
        {products.length === 0 ? (
          <div className="text-gray-400">No products found</div>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="flex justify-between items-center p-2 bg-gray-900 rounded"
            >
              <div className="flex-1">
                <div className="text-white font-medium">{product.name}</div>
                <div className="text-gray-400 text-sm">
                  ${product.price}
                  {product.originalPrice && (
                    <span className="line-through ml-2">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
                <div className="text-gray-500 text-xs">
                  {getCategoryName(product.categoryId)} •{" "}
                  {product.available ? "Available" : "Unavailable"}
                  {product.isFeatured && " • Featured"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(product)}
                  className="border border-yellow-500 text-yellow-500 px-2 py-1 rounded hover:bg-yellow-500 hover:text-black transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="border border-red-500 text-red-500 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
