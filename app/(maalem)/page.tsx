"use client";
import Hero from "@/components/Layout/Hero";
import GenderCollectionSection from "@/components/Products/GenderCollectionSection";
import Slider from "@/components/Products/Slider";
import ProductDetails from "@/components/Products/ProductDetails";
import Location from "@/components/Layout/Location";
import { useAppContext } from "@/Contexts/AppContext";
import { useState, useEffect } from "react";

export default function Home() {
  const { products } = useAppContext();
  const [bestSeller, setBestSeller] = useState<any>(null);

  // Get featured products from global state (only available ones)
  const featuredProducts = products.filter(
    (product) => product.isFeatured && product.available,
  );

  // Find best seller (you might want to make this configurable)
  useEffect(() => {
    if (products.length > 0) {
      // Find best seller from available products only
      const availableProduct = products.find((p) => p.available);
      if (availableProduct) {
        setBestSeller(availableProduct);
      }
    }
  }, [products]);

  return (
    <>
      <Hero />
      <GenderCollectionSection />
      <Slider featuredProducts={featuredProducts} />
      {bestSeller && (
        <div className="min-h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] flex flex-col mt-10 p-4 sm:p-8">
          <h2 className="text-3xl text-center font-bold mb-2 text-[#c27a2c]">
            Best Seller
          </h2>
          <div className="flex-grow max-h-[calc(100vh-128px)] sm:h-[calc(100vh-180px)]">
            <ProductDetails
              _id={bestSeller._id}
              name={bestSeller.name}
              price={bestSeller.price}
              originalPrice={bestSeller.originalPrice || 0}
              description={bestSeller.description}
              url={bestSeller.url || bestSeller.image}
              bgColor={bestSeller.bgColor || "#f0f0f0"}
            />
          </div>
        </div>
      )}
      <div className="max-h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] container mx-auto mt-10">
        <Location />
      </div>
    </>
  );
}
