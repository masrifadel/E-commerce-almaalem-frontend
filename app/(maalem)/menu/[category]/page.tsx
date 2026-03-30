"use client";
import React from "react";
import DropDown from "@/components/Products/DropDown";
import ProductGrid from "@/components/Products/ProductGrid";
import { useAppContext } from "@/Contexts/AppContext";

const MenuPage = ({ params }: { params: Promise<{ category: string }> }) => {
  const { products } = useAppContext();
  const [category, setCategory] = React.useState<string>("");

  React.useEffect(() => {
    const getCategory = async () => {
      const { category: cat } = await params;
      setCategory(cat);
    };
    getCategory();
  }, [params]);

  return (
    <div className="flex flex-col w-full p-4">
      <DropDown />
      <ProductGrid products={products} />
    </div>
  );
};

export default MenuPage;
