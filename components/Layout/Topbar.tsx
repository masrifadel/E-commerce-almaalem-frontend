import { IoLogoInstagram } from "react-icons/io";
import { FaWhatsapp, FaFacebook } from "react-icons/fa";
const Topbar = () => {
  return (
    // bg-[#2e4a63]

    <div className="text-white">
      <div className="container mx-auto flex justify-between items-center py-3">
        <div className="flex items-center space-x-4 ">
          <a
            href="https://wa.me/96181803537"
            className="hover:text-[#c27a2c] transition duration-200  "
          >
            <FaWhatsapp className="h-5 w-9 sm:h-8 sm:w-8" />
          </a>
          <a href="#" className="hover:text-[#c27a2c] transition duration-200">
            <IoLogoInstagram className="h-5 w-9 sm:h-8 sm:w-8" />
          </a>
          <a href="#" className="hover:text-[#c27a2c] transition duration-200">
            <FaFacebook className="h-4 w-4 sm:h-8 sm:w-8 " />
          </a>
        </div>

        <div className="hidden sm:block text-sm text-center sm:text-lg align-center  m-auto md:m-0">
          <span>We Deliver to Beirut, and Mount Lebanon</span>
        </div>
        <div className="text-sm sm:text-lg pr-1">
          <a
            href="tel:+96181803537"
            className="hover:text-[#c27a2c] transition duration-200"
          >
            +961 81 803 537
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
