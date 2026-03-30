"use client";
import CategoryForm from "@/components/admin/CategoryForm";
import ProductForm from "@/components/admin/ProductForm";
import CategoryList from "@/components/admin/CategoryList";
import ProductList from "@/components/admin/ProductList";
import OrderList from "@/components/admin/OrderList";

export default function AdminPage() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-center text-2xl md:text-4xl font-bold text-yellow-500">
        Admin Dashboard
      </h1>

      {/* Forms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <CategoryForm />
        <ProductForm />
      </div>

      {/* Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <CategoryList />
        <ProductList />
      </div>
      <div className="mt-6">
        <OrderList />
      </div>
    </div>
  );
}
