"use client";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState } from "react";
import Link from "next/link";

type featuredProducts = {
  _id: string;
  name: string;
  originalPrice: number;
  price: number;
  url: string;
  isFeatued: boolean;
  description: string;
  categoryId: {
    _id: string;
    name: string;
    path: string;
  };
  available: boolean;
};

const Slider = ({
  featuredProducts,
}: {
  featuredProducts: featuredProducts[];
}) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setIsAtStart(el?.scrollLeft === 0);

    setIsAtEnd(el?.scrollLeft + el?.clientWidth >= el?.scrollWidth - 1);
  };

  return (
    <section className="container text-center mx-auto h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] flex flex-col p-4 sm:p-8">
      <h2 className="text-3xl font-bold mb-2 text-[#c27a2c]">
        Real Fire. Real Flavor.
      </h2>
      <p className="text-lg text-white mb-4 px-2">
        Experience the ultimate collection of burgers, plates, and
        sandwiches—expertly grilled and designed to satisfy every appetite.
      </p>
      <h1 className="text-white flex items-center justify-center text-3xl arabicFont text-[#c27a2c]">
        تشكيلة واسعة من البرجر، الصحون، والساندوتشات
      </h1>
      <div className="flex justify-end p-2 gap-2">
        <button
          onClick={scrollLeft}
          className={`p-2 rounded-full border cursor-pointer
  ${isAtStart ? "bg-gray-300" : "bg-white"}`}
        >
          <FiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={scrollRight}
          className={`p-2 rounded-full border cursor-pointer
  ${isAtEnd ? "bg-gray-300" : "bg-white"}`}
        >
          <FiChevronRight className="text-2xl" />
        </button>
      </div>
      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden space-x-6 px-2 flex-grow "
      >
        {featuredProducts.map((item, index) => {
          return (
            <div className="grow-0 shrink-0 relative " key={index}>
              <img
                src={`https://maalem-backend-ybme.onrender.com${item.url}`}
                alt={item.url}
                className="max-w-[300px] h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 backdrop-blur-md text-white p-4 rounded-b-lg">
                <Link href={`/product/${item._id}`}>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="mt-1">$ {item.price}</p>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Slider;
