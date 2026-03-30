import { RiDeleteBinLine } from "react-icons/ri";
import { useAppContext } from "@/Contexts/AppContext";
const CartContent = () => {
  const { data, setData } = useAppContext();

  console.log("data", data);

  const handleIncCart = async (item: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("Increment from the backend side");
      const res = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/cart/",
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.product._id,
            action: "increment",
          }),
        },
      );
      const updatedCart = await res.json();
      setData(updatedCart.cart.items);
      console.log(updatedCart);
    } else {
      setData((prevData = []) => {
        const updatedData = prevData.map((mappedItem) => {
          if (mappedItem._id === item._id && item.quantity < 100) {
            return { ...mappedItem, quantity: item.quantity + 1 };
          }
          return mappedItem;
        });
        return updatedData;
      });
    }
  };

  const handleDecCart = async (item: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/cart/",
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.product._id,
            action: "decrement",
          }),
        },
      );
      const updatedCart = await res.json();
      setData(updatedCart.cart.items);
      console.log(updatedCart);
    } else {
      if (item.quantity === 1) {
        return;
      }
      setData((prevData = []) => {
        const updatedData = prevData.map((mappedItem) => {
          if (mappedItem._id === item._id) {
            return {
              ...mappedItem,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            };
          }
          return mappedItem;
        });
        return updatedData;
      });
    }
  };

  const handleDelete = async (item: any) => {
    const token = localStorage.getItem("token");
    if (token) {
      const res = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/cart/",
        {
          method: "PUT",
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            productId: item.product._id,
            action: "delete",
          }),
        },
      );
      const updatedCart = await res.json();
      setData(updatedCart.cart.items);
      console.log(updatedCart);
    } else {
      setData((prevData = []) =>
        prevData.filter((item) => item._id !== item._id),
      );
    }
  };
  return (
    <div>
      {data && data.length > 0 ? (
        data.map((item, index) => {
          return (
            <div
              key={index}
              className="flex items-start justify-between py-4  border-b border-[#c27a2c]"
            >
              <div className="flex items-start">
                <img
                  src={
                    "https://maalem-backend-ybme.onrender.com" +
                    (item?.product?.url ? item.product.url : item.url)
                  }
                  alt={item?.product?.name || item.name}
                  className="w-12 h-12 object-cover rounded"
                />
              </div>
              <div className="mx-2">
                <h3 className="text-white">
                  {item?.product?.name || item.name}
                </h3>
                <div className="flex items-center mt-1">
                  <button
                    onClick={() => handleDecCart(item)}
                    disabled={item.quantity <= 1}
                    className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border rounded w-7 px-2 py-0 text-xl font-medium text-white"
                  >
                    -
                  </button>
                  <span className="mx-2 text-white">{item?.quantity}</span>
                  <button
                    onClick={() => handleIncCart(item)}
                    disabled={item.quantity >= 100}
                    className="disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border rounded w-7 px-1.5 py-0 text-xl font-medium text-white"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-xs text-white">
                  $ {item?.product?.price?.toLocaleString() || item.price}
                </p>
                <p className="text-xs text-white">
                  <span>Total: </span>${" "}
                  {(
                    item?.quantity * (item?.product?.price || item.price)
                  ).toLocaleString()}
                </p>
                <button onClick={() => handleDelete(item)}>
                  <RiDeleteBinLine className="h-6 w-6 mt-2 text-xs text-red-500 cursor-pointer" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-white text-center">Your cart is empty.</p>
      )}
    </div>
  );
};

export default CartContent;
