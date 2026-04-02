"use client";
import { IoMdClose } from "react-icons/io";
import CartContent from "@/components/Cart/CartContent";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";
const CartDrawer = ({
  setDrawerOpen,
  drawerOpen,
}: {
  setDrawerOpen: (open: boolean) => void;
  drawerOpen: boolean;
}) => {
  const { data } = useAppContext();
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const router = useRouter();
  const handleCheckout = () => {
    setDrawerOpen(false);
    // Guest ordering - no token required
    if (data.length > 0) {
      router.push("/checkout");
    } else {
      toast.error("Please add items to your cart first");
    }
  };

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
      <div
        className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] bg-[#2e4a63] shadow-lg transform transition-transform duration-300 flex flex-col z-50 h-screen ${drawerOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        <div className="flex justify-end p-4" onClick={toggleCartDrawer}>
          <button>
            <IoMdClose className="h-6 w-6 cursor-pointer text-white" />
          </button>
        </div>
        <div className="flex-grow p-4 overflow-y-auto">
          <h2 className="text-xl font-semibold mb-4 text-[#c27a2c]">
            Your Cart
          </h2>
          <CartContent />
        </div>
        <div className="p-4 sticky bottom-0">
          <button
            onClick={handleCheckout}
            className="w-full bg-[#c27a2c] text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Checkout
          </button>
          <p className="text-sm tracking-tighter text-white mt-2 text-center">
            Order total, delivery, and discount codes calculated at checkout.
          </p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
