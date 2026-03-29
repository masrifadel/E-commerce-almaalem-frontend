"use client";
import { IoBagOutline, IoSearch } from "react-icons/io5";
import { HiBars3BottomRight, HiOutlineUser } from "react-icons/hi2";
import Link from "next/link";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { usePathname } from "next/navigation";
import CartDrawer from "../Layout/CartDrawer";
import SearchBar from "./SearchBar";
import { useAppContext } from "@/Contexts/AppContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { categories, setCategories } = useAppContext();

  const handleProfileClick = () => {
    // 1. Check if the token exists in LocalStorage
    const token = localStorage.getItem("token");

    if (!token) {
      // 2. No token? Send them to Login
      // We add '?redirect=/profile' so they come back here automatically later
      router.push("/login?redirect=/profile");
    } else {
      // 3. Token exists? Send them to their actual Profile/History page
      router.push("/profile");
    }
  };

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/category");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);
      } catch (error: any) {
        console.log("Failed to fetch categories:", error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Overlay */}
      {navDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setNavDrawerOpen(false)}
        ></div>
      )}
      <nav className="shadow-md px-2">
        <div className="flex justify-between container mx-auto py-4 items-center">
          <div className="">
            <Link href="/">
              {/* text-[#c27a2c] */}
              <img src="/Logo.svg" alt="" className="h-10 w-20 object-cover" />
            </Link>
          </div>
          <div className="hidden md:flex gap-x-6 ">
            {categories.map((item) => {
              return (
                <Link
                  key={item.path}
                  href={`/menu/${item.path}`}
                  className={`transition duration-200 text-sm font-medium uppercase ${
                    pathname === `/menu/${item.path}`
                      ? "text-[#c27a2c] border-b-2 border-[#c27a2c]"
                      : "text-white hover:text-[#c27a2c]"
                  }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-3 ">
            <button onClick={handleProfileClick}>
              <HiOutlineUser
                className={`text-xl ${pathname === "/profile" ? "text-[#c27a2c]" : "text-white"} hover:text-[#c27a2c] transition duration-200`}
              />
            </button>

            <button
              className="relative cursor-pointer text-xl"
              onClick={() => setDrawerOpen(true)}
            >
              <IoBagOutline className="text-white hover:text-[#c27a2c] transition duration-200" />
              <span className="absolute -top-1 bg-[#c27a2c] text-xs rounded-full text-white px-1">
                4
              </span>
            </button>

            <SearchBar />

            <button
              onClick={toggleNavDrawer}
              className="md:hidden cursor-pointer text-white hover:text-black text-xl"
            >
              <HiBars3BottomRight />
            </button>
          </div>
        </div>
      </nav>

      <CartDrawer setDrawerOpen={setDrawerOpen} drawerOpen={drawerOpen} />
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:hidden h-full bg-[#2e4a63] shadow-lg transform transition-transform duration-300 z-50 
  ${navDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Close button */}
          <div className="flex justify-end p-4">
            <button onClick={toggleNavDrawer}>
              <IoMdClose className="h-6 w-6 text-white" />
            </button>
          </div>

          {/* Menu section */}
          <div className="px-6">
            <nav className="space-y-5 text-lg">
              {categories.map((item) => {
                return (
                  <Link
                    key={item.path}
                    href={`/menu/${item.path}`}
                    onClick={toggleNavDrawer}
                    className={` block transition ${
                      pathname === `/menu/${item.path}`
                        ? "text-[#c27a2c]"
                        : "text-white hover:text-[#c27a2c]"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom section */}
          <div className="mt-auto px-6 pb-8">
            {/* Divider */}
            <div className="border-t border-gray-500 my-6"></div>

            <p className="text-[#c27a2c] font-medium mb-3">Follow Us</p>

            {/* Social icons */}
            <div className="flex space-x-4 mb-6 text-white text-xl">
              <a
                href="https://wa.me/96181803537"
                className="hover:text-[#c27a2c]"
              >
                <FaWhatsapp />
              </a>

              <a href="#" className="hover:text-[#c27a2c]">
                <IoLogoInstagram />
              </a>

              <a href="#" className="hover:text-[#c27a2c]">
                <FaFacebook />
              </a>
            </div>

            {/* Contact */}
            <div className="text-sm text-gray-200 space-y-2">
              <p>📞 +961 81 803 537</p>
              <p>✉️ king_masry@live.com</p>
            </div>
            <p className="text-xs text-gray-400 mt-6">
              © 2026, Al Maalem, All Rights are Reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
