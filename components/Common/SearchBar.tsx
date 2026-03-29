"use client";
import { useAppContext } from "@/Contexts/AppContext";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";

const SearchBar = () => {
  const { searchQuery, setSearchQuery } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchSubmit = (e: any) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className={` 
        absolute top-0 left-0 w-full bg-[#2e4a63] h-[116px] sm:h-[128] z-50 transition-all duration-300 ease-in-out py-9
        ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }
        `}
      >
        <form
          onSubmit={handleSearchSubmit}
          className={`flex justify-center items-center w-full  h-full`}
        >
          <div className="relative w-1/2 flex gap-2">
            <input
              type="text"
              placeholder="Search for Item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 px-4 py-1 rounded-lg
              focus:outline-none
              w-full 
              placeholder:text-[#c27a2c]
              "
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer transition-all duration-300 "
            >
              <HiMagnifyingGlass className="h-5 w-5"></HiMagnifyingGlass>
            </button>
          </div>
          <button
            type="button"
            className="cursor-pointer text-white absolute right-2 top-2"
            onClick={() => {
              setIsOpen(false);
              // setSearchTerm("");
            }}
          >
            <HiMiniXMark className="h-6 w-6"></HiMiniXMark>
          </button>
        </form>
      </div>

      <button
        className="cursor-pointer text-white hover:text-[#c27a2c] transition duration-200 text-xl"
        onClick={() => setIsOpen(true)}
      >
        <HiMagnifyingGlass />
      </button>
    </div>
  );
};
export default SearchBar;
