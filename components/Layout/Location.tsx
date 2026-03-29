import { IoLocationOutline, IoTimeOutline } from "react-icons/io5";

const Location = () => {
  return (
    <section className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-[1fr_1fr] h-[calc(100vh-116px)] items-stretch">
      <div className="w-full flex flex-col justify-center p-4 sm:p-8 sm:rounded-tl-3xl sm:rounded-bl-3xl h-full ">
        {/* Info Section */}
        <div
          className="flex items-center mb-2 space-x-2 rtl:space-x-reverse"
          dir="rtl"
        >
          <IoLocationOutline className="text-[#c27a2c] text-2xl flex-shrink-0" />
          <h4 className="text-lg sm:text-xl font-semibold text-white">
            لبنان, بيروت, حارة حريك
          </h4>
        </div>

        {/* Address Details */}
        <p
          className="text-md sm:text-2xl font-semibold text-white mb-4 text-right"
          dir="rtl"
        >
          تحت جسر حرقوص, قرب حلويات نمر الوادي.
        </p>

        {/* Hours */}
        <div
          className="flex items-center mb-4 space-x-2 rtl:space-x-reverse"
          dir="rtl"
        >
          <IoTimeOutline className="text-[#c27a2c] text-2xl flex-shrink-0" />
          <p className="text-white text-md sm:text-lg">
            Daily 10:00 AM - 02:00 AM
          </p>
        </div>

        {/* Map with Gradient Border */}
        <div className="flex-grow p-[3px] rounded-lg bg-gradient-to-r from-[#c27a2c] to-[#2e4a63]">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d26507.682206996185!2d35.515373!3d33.852027!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f177c124d6349%3A0xaeb1ff084d2e9728!2sHaret%20Hreik!5e0!3m2!1sen!2slb!4v1773549173781!5m2!1sen!2slb"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Restaurant Image with Gradient Border */}
      <div className="p-4 sm:p-8">
        <div className="p-[3px] rounded-lg bg-gradient-to-r from-[#c27a2c] to-[#2e4a63] h-full flex ">
          <img
            src="/restaurant.png"
            alt="Restaurant"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Location;
