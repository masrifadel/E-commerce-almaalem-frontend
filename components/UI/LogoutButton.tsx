"use client";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/Contexts/AppContext";

const LogoutButton = ({ isAdmin = false }) => {
  const router = useRouter();
  const { setData } = useAppContext();

  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Clear cart data
    localStorage.removeItem("cart");
    
    // Clear app context data
    setData([]);
    
    // Redirect based on user type
    if (isAdmin) {
      router.push("/login");
    } else {
      router.push("/");
    }
    
    // Force refresh to clear any cached data
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4 4m4-4H7a4 4 0 00-4 4v6a4 4 0 004 4h14a4 4 0 004-4v-6a4 4 0 00-4-4H7m6 4v6a4 4 0 01-4 4H5a4 4 0 01-4-4v-6a4 4 0 014-4h14a4 4 0 014 4v6"
        />
      </svg>
      Logout
    </button>
  );
};

export default LogoutButton;
