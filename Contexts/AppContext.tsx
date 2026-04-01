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
  products: any[];
  setProducts: React.Dispatch<React.SetStateAction<any[]>>;
  orders: any[];
  setOrders: React.Dispatch<React.SetStateAction<any[]>>;
  triggerOrderUpdate: () => void;
  refreshTrigger: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  // Loading states
  categoriesLoading: boolean;
  setCategoriesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  productsLoading: boolean;
  setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  ordersLoading: boolean;
  setOrdersLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: boolean;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  // Refresh functions
  refreshCategories: () => void;
  refreshProducts: () => void;
  refreshOrders: () => void;
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
  // Loading states
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Use ref to track initial fetch state
  const isInitialFetchRef = useRef(false);

  const refreshCategories = async () => {
    // Skip API calls during build time
    if (typeof window === "undefined") return;

    // Set loading state
    setCategoriesLoading(true);

    try {
      const response = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/category",
      );
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
    } finally {
      // Clear loading state
      setCategoriesLoading(false);
    }
  };

  const refreshProducts = async () => {
    // Skip API calls during build time
    if (typeof window === "undefined") return;

    // Set loading state
    setProductsLoading(true);

    try {
      const response = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/products",
      );
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
    } finally {
      // Clear loading state
      setProductsLoading(false);
    }
  };

  const refreshOrders = async () => {
    // Set loading state
    setOrdersLoading(true);

    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch(
        "https://maalem-backend-ybme.onrender.com/api/checkout/admin/all",
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
    } finally {
      // Clear loading state
      setOrdersLoading(false);
    }
  };

  // Add direct order update function
  const triggerOrderUpdate = () => {
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
      // Skip API calls during build time
      if (typeof window === "undefined") return;

      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const res = await fetch(
            "https://maalem-backend-ybme.onrender.com/api/cart",
            {
              headers: { Authorization: `Bearer ${savedToken}` },
            },
          );
          const result = await res.json();
          if (result.cart) {
            setData(result.cart.items);
            localStorage.removeItem("cart");
          } else if (result.items) {
            setData(result.items);
            localStorage.removeItem("cart");
          }
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
  }, []); // Remove fetchData dependency to prevent infinite loop

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
        setProducts,
        refreshProducts,
        orders,
        setOrders,
        refreshOrders,
        triggerOrderUpdate,
        setFetchData,
        fetchData,
        refreshTrigger,
        setRefreshTrigger,
        // Loading states
        categoriesLoading,
        setCategoriesLoading,
        productsLoading,
        setProductsLoading,
        ordersLoading,
        setOrdersLoading,
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
