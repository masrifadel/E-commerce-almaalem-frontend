"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";

declare global {
  interface Window {
    isInitialFetch?: boolean;
  }
}

type AppContextType = {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: {
    _id: string;
    name: string;
    path: string;
    imageUrl: string;
  }[];
  setCategories: React.Dispatch<
    React.SetStateAction<
      {
        _id: string;
        name: string;
        path: string;
        imageUrl: string;
      }[]
    >
  >;
  refreshCategories: () => void;
  products: any[];
  refreshProducts: () => void;
  orders: any[];
  refreshOrders: () => void;
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  triggerOrderUpdate: () => void;
  refreshTrigger: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: boolean;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<
    { _id: string; name: string; path: string; imageUrl: string }[]
  >([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Use ref to track initial fetch state
  const isInitialFetchRef = useRef(false);

  const refreshCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/category");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
        // Only signal other tabs if this is not the initial fetch
        if (!isInitialFetchRef.current) {
          localStorage.setItem("categories-updated", Date.now().toString());
        }
      }
    } catch (error) {
      console.error("Failed to refresh categories:", error);
    }
  };

  const refreshProducts = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || data);
        // Only signal other tabs if this is not the initial fetch
        if (!isInitialFetchRef.current) {
          localStorage.setItem("products-updated", Date.now().toString());
        }
      }
    } catch (error) {
      console.error("Failed to refresh products:", error);
    }
  };

  const refreshOrders = async () => {
    console.log("🔄 refreshOrders called!");
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      console.log("🔑 Token found:", token ? "YES" : "NO");
      const response = await fetch(
        "http://localhost:5001/api/checkout/admin/all",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );
      console.log("📡 Response status:", response.status);
      if (response.ok) {
        const data = await response.json();
        console.log("📊 Orders fetched:", data.length);
        setOrders(data);
        // Signal to other AppContext instances to refresh
        if (!window.isInitialFetch) {
          localStorage.setItem("orders-updated", Date.now().toString());
        }
      }
    } catch (error) {
      console.error("❌ Failed to refresh orders:", error);
    }
  };

  // Add direct order update function
  const triggerOrderUpdate = () => {
    console.log("🚀 triggerOrderUpdate called!");
    refreshOrders();
    // Also trigger localStorage for cross-tab support
    localStorage.setItem("orders-updated", Date.now().toString());
    console.log("📦 localStorage orders-updated triggered");
  };

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      // Only handle storage events if not during initial fetch
      if (
        !isInitialFetchRef.current &&
        (e.key === "categories-updated" ||
          e.key === "products-updated" ||
          e.key === "orders-updated")
      ) {
        if (e.key === "categories-updated") {
          refreshCategories();
        } else if (e.key === "products-updated") {
          refreshProducts();
        } else if (e.key === "orders-updated") {
          refreshOrders();
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    // Initial fetch on mount
    isInitialFetchRef.current = true;
    const timer = setTimeout(() => {
      refreshCategories();
      refreshProducts();
      // Clear the flag after initial fetch completes
      setTimeout(() => {
        isInitialFetchRef.current = false;
      }, 50);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchInitialCart = async () => {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const res = await fetch("http://localhost:5001/api/cart", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });
          const result = await res.json();
          if (result.cart) setData(result.cart.items);
        } catch (err) {
          console.error("Failed to fetch server cart", err);
        }
      } else {
        const saved = localStorage.getItem("cart");
        if (saved) {
          setData(JSON.parse(saved));
        }
      }
    };

    fetchInitialCart();
  }, [fetchData]); // Runs only ONCE on mount and once logged in

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Only save to localStorage if the user is NOT logged in
    if (!token) {
      localStorage.setItem("cart", JSON.stringify(data));
    }
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        searchQuery,
        setSearchQuery,
        categories,
        setCategories,
        refreshCategories,
        products,
        refreshProducts,
        orders,
        setOrders,
        refreshOrders,
        triggerOrderUpdate,
        setFetchData,
        fetchData,
        refreshTrigger,
        setRefreshTrigger,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    console.error(
      "useAppContext called outside AppProvider. Stack trace:",
      new Error().stack,
    );
    throw new Error("useAppContext must be used inside AppProvider");
  }
  return context;
};
