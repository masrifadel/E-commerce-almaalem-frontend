import Hero from "@/components/Layout/Hero";

import GenderCollectionSection from "@/components/Products/GenderCollectionSection";
import Slider from "@/components/Products/Slider";
import ProductDetails from "@/components/Products/ProductDetails";
import Location from "@/components/Layout/Location";

export default async function Home() {


  

  const productId = "69c5767afacdcfac1bcc510b";
  const res = await fetch("http://localhost:5001/api/products/featured");
  const featuredProducts = await res.json();

  const bestSellerRes = await fetch(
    "http://localhost:5001/api/products/" + productId,
  );
  const bestSeller = await bestSellerRes.json();

  return (
    <>
      <Hero />
      <GenderCollectionSection />
      <Slider featuredProducts={featuredProducts.products} />
      <div className="min-h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] flex flex-col mt-10 p-4 sm:p-8">
        <h2 className="text-3xl text-center font-bold mb-2 text-[#c27a2c]">
          Best Seller
        </h2>
        <div className="flex-grow max-h-[calc(100vh-128px)] sm:h-[calc(100vh-180px)]" >
          <ProductDetails
            id={bestSeller._id}
            name={bestSeller.name}
            price={bestSeller.price}
            originalPrice={bestSeller.originalPrice}
            description={bestSeller.description}
            image={bestSeller.url}
            bgColor={bestSeller.bgColor}
          />
        </div>
      </div>
      <div className="max-h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] container mx-auto mt-10">
        <Location />
      </div>
    </>
  );
}
