import Quantity from "./Quantity";

const ProductDetails = ({
  _id,
  name,
  price,
  originalPrice,
  description,
  url,
  quantity,
  bgColor,
}: {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  url: string;
  quantity?: number;
  bgColor: string;
}) => {
  return (
    <div
      className={`max-w-4xl mx-auto w-full sm:h-100 flex flex-col sm:flex-row bg-[${bgColor}] rounded-2xl overflow-hidden shadow-2xl pb-2 sm:pb-0`}
    >
      {/* Main Image */}
      <div className="sm:w-1/2 h-75 sm:h-auto grow rounded-lg">
        <img
          src={
            url?.startsWith("data:")
              ? url
              : `https://maalem-backend-ybme.onrender.com${url}` ||
                "/placeholder.png"
          }
          alt={name}
          className={`w-full h-full object-cover ${bgColor === "#2e4a63" ? "rounded-none" : "rounded-2xl"}`}
        />
      </div>
      {/* Right section */}
      <div className="sm:w-1/2 sm:ml-4 flex flex-col justify-center px-2 border-xl mb-0 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{name}</h1>
        <p className="text-lg line-through text-white hidden sm:block">
          {originalPrice && originalPrice}
        </p>
        <p className="text-xl text-orange-400 font-semibold">$ {price}</p>
        <p className="text-gray-200 text-md">{description}</p>
        <Quantity
          product={{
            _id,
            name,
            price,
            description,
            url,
            quantity: quantity ?? 1,
          }}
        />
      </div>
    </div>
  );
};

export default ProductDetails;
