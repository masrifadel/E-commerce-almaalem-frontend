import React from "react";
import DropDown from "@/components/Products/DropDown";
import ProductGrid from "@/components/Products/ProductGrid";

const page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  console.log(category);

  const response = await fetch("http://localhost:5001/api/products");
  const fetchedProducts = await response.json();
  console.log("fetchedProducts", fetchedProducts.products);

  return (
    <div className="flex flex-col w-full p-4">
      <DropDown />
      {/* <ProductGrid products={fetchedProducts} />  */}
      <ProductGrid products={fetchedProducts.products} />
    </div>
  );
};

export default page;
