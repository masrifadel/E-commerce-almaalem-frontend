"use client";
import Link from "next/link";
import { useAppContext } from "@/Contexts/AppContext";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const GenderCollectionSection = () => {
  const { categories, categoriesLoading } = useAppContext();

  // Helper function to convert category path to match URL format
  const toSlug = (path: string) =>
    path.toLowerCase().replaceAll(" & ", "&").replaceAll(" ", "");

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Show loading spinner while categories are loading */}
      {categoriesLoading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="large" />
          <p className="text-white text-lg mt-4">Loading categories...</p>
        </div>
      ) : (
        <>
          {/* Flex container with wrap and centering */}
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category: any) => (
              <div
                key={category._id}
                className="relative overflow-hidden group rounded-lg h-[300px] sm:h-[400px] w-[calc(50%-8px)] md:w-[calc(50%-8px)] lg:flex-1 lg:min-w-[400px]"
              >
                <Link
                  href={`/menu/${toSlug(category.path)}`}
                  className="block h-full w-full"
                >
                  <img
                    src={
                      `https://maalem-backend-ybme.onrender.com${category.imageUrl}` ||
                      "/placeholder.png"
                    }
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <div className="absolute bg-white/90 backdrop-blur-sm rounded p-2 bottom-4 shadow-sm sm:left-4 left-1 sm:shadow-md w-[140px] sm:w-[230px]">
                    <h1 className="font-bold sm:text-lg text-xs">
                      {category.name}
                    </h1>
                    <p className="underline text-[10px] sm:text-sm cursor-pointer hover:text-gray-600">
                      Shop Now
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GenderCollectionSection;
