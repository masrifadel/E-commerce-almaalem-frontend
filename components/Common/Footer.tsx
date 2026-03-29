import { FaWhatsapp, FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";
import Link from "next/link";
import CustomerInfo from "./CustomerInfo";

const Footer = () => {
  return (
    <footer className="bg-cover bg-no-repeat border-t border-[#c27a2c] bg-[url('/tableye.png')] bg-[center_40%]">
      <div className="container mx-auto px-6 py-12 flex flex-wrap gap-8 gap-10 border-t">
        {/* Brand Section */}
        <div className=" flex-1 min-w-[220px]bg-green-500">
          <h1 className="text-xl text-[#c27a2c] mb-3 font-semibold">
            Al Maalem
          </h1>

          <p className="text-white text-sm mb-4 sm:text-lg">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>

          <p className="text-white text-sm mb-6">
            Sign up and start your journey discovering our{" "}
            <span className="underline text-[#c27a2c]">
              <Link href="/menu/all">menu</Link>
            </span>
            .
          </p>
        </div>

        {/* Shop */}
        <div className="flex-1 md:border-l md:border-[#c27a2c] md:pl-6">
          <h1 className="text-[#c27a2c] text-lg mb-3 text-bold">Shop</h1>

          <ul className="list-disc pl-5 marker:text-[#c27a2c] space-y-1 sm:text-lg">
            <li>
              <Link
                href="/menu/sandwich"
                className="text-white hover:text-[#c27a2c]"
              >
                Sandwich
              </Link>
            </li>

            <li>
              <Link
                href="/menu/burger"
                className="text-white hover:text-[#c27a2c]"
              >
                Burger
              </Link>
            </li>

            <li>
              <Link
                href="/menu/plate"
                className="text-white hover:text-[#c27a2c]"
              >
                Plate
              </Link>
            </li>

            <li>
              <Link
                href="/menu/sides&soda"
                className="text-white hover:text-[#c27a2c]"
              >
                Sides and Soda
              </Link>
            </li>
          </ul>
        </div>

        <CustomerInfo />

        {/* Follow & Order */}
        <div className="md:border-l md:border-[#c27a2c] md:pl-6 sm:text-lg">
          <h1 className="text-[#c27a2c] text-lg mb-3 text-bold">
            Follow & Order
          </h1>

          <div className="space-y-3 text-white sm:text-lg">
            <div className="flex items-center gap-2">
              <FiPhoneCall />
              <span>+961 81 803 537</span>
            </div>
            <Link href="/menu/all">
              <button className="mt-4 border border-[#c27a2c] text-white px-5 py-2 rounded hover:bg-[#c27a2c] transition">
                Order Now →
              </button>
            </Link>

            <p className="text-sm pt-3">king_masry@live.com</p>
            <div className="flex items-center space-x-4 sm:text-lg ">
              <a
                href="https://wa.me/96181803537"
                className="hover:text-[#c27a2c] transition duration-200  "
              >
                <FaWhatsapp className="h-5 w-9 sm:h-6 sm:w-6" />
              </a>
              <a
                href="#"
                className="hover:text-[#c27a2c] transition duration-200"
              >
                <IoLogoInstagram className="h-5 w-9 sm:h-6 sm:w-6" />
              </a>
              <a
                href="#"
                className="hover:text-[#c27a2c] transition duration-200"
              >
                <FaFacebook className="h-4 w-4 sm:h-6 sm:w-6 " />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-[#c27a2c] py-4 text-center text-white text-sm">
        © 2026, Fadel Al Masri, All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
