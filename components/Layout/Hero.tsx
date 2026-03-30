import { MdOutlineOutdoorGrill } from "react-icons/md";
import { FaStar, FaTruck } from "react-icons/fa";
import Link from "next/link";
const Hero = () => {
  return (
    <section
      className="relative h-[calc(100vh-116px)] sm:h-[calc(100vh-128px)] flex-grow bg-black flex justify-center overflow-hidden"
      style={{
        backgroundImage: ` url(/bg-maalem.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
      }}
    >
      {/* Smoke */}
      <img
        src="/smoke.gif"
        className="object-cover w-1/2 absolute z-10 opacity-25  bottom-0 left-[50%] top-0 h-full"
        alt="smoke"
      />
      <img
        src="/smoke.gif"
        className="object-cover w-1/2 opacity-25 absolute z-10 bottom-0 right-[50%] top-0 h-full"
        alt="smoke"
      />

      <img
        src="/smoke.gif"
        className="object-cover w-full  opacity-25 absolute z-10 bottom-0 right-0 left-0 top-0 h-full"
        alt="smoke"
      />

      <div className="flex flex-col gap-4 ">
        <img src="/Logo.png" className="w-72 mx-auto" alt="logo" />
        <h1 className="text-white flex items-center justify-center text-3xl arabicFont  leading-relaxed ">
          {" "}
          الفحمات عالنار... المعلم واصل{" "}
        </h1>
        <div className="flex justify-center">
          <Link
            href={"menu/all"}
            className="group flex z-50 items-center gap-2 bg-[#c27a2c] hover:bg-[#2e4a63] cursor-pointer text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
          >
            اطلب القائمة | View Menu
            <span className="text-lg transform transition-transform group-hover:translate-x-1">
              ›
            </span>
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 text-whitetext-sm md-text-base">
          {/* Rating */}
          <div className="flex items-center gap-2 pl-5">
            <FaStar className="text-[#c27a2c] text-xl sm:text-xl" />
            <span className="text-white font-semibold">
              4.8 تقييم | 4.8 Rating
            </span>
          </div>
          <span className="text-gray-400">|</span>
          <div className="flex items-center gap-2">
            <FaTruck className="text-[#c27a2c] text-lg text-3xl sm:text-xl" />
            <span className="text-white font-semibold">
              توصيل سريع | Fast Delivery
            </span>
          </div>
          <span className="text-gray-400">|</span>
          <div className="flex items-center justify-center gap-2 pr-3">
            <MdOutlineOutdoorGrill className="text-[#c27a2c] text-3xl sm:text-xl" />
            <span className="text-white font-semibold">
              شواء فحم | Charcoal Grill
            </span>
          </div>
        </div>
      </div>
      {/* Logo Image */}
    </section>
  );
};

export default Hero;
