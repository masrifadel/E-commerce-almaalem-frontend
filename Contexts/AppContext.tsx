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

  // Debounce refs to prevent rapid successive calls
  const categoriesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const refreshCategories = async () => {
    // Skip API calls during build time
    if (typeof window === "undefined") return;

    // Clear any pending timeout
    if (categoriesTimeoutRef.current) {
      clearTimeout(categoriesTimeoutRef.current);
    }

    // Set loading state
    setCategoriesLoading(true);

    try {
      // Add retry logic for API calls with reduced frequency
      let retryCount = 0;
      const maxRetries = 2;
      let response;
      let data;

      while (retryCount < maxRetries) {
        try {
          response = await fetch(
            "https://maalem-backend-ybme.onrender.com/api/category",
          );

          if (response.ok) {
            data = await response.json();
            break;
          }

          // If not successful and we have retries left, wait and retry
          if (retryCount < maxRetries - 1) {
            retryCount++;
            console.log(`Retry ${retryCount} for categories...`);
            await new Promise((resolve) =>
              setTimeout(resolve, 2000 * retryCount),
            );
          }
        } catch (error) {
          retryCount++;
          console.log(
            `Retry ${retryCount} for categories due to error:`,
            error,
          );
          if (retryCount < maxRetries) {
            await new Promise((resolve) =>
              setTimeout(resolve, 2000 * retryCount),
            );
          }
        }
      }

      if (response && response.ok && data) {
        setCategories(data);
        // Only signal other tabs if this is not the initial fetch
        if (!isInitialFetchRef.current) {
          localStorage.setItem("categories-updated", Date.now().toString());
        }
      } else {
        console.error("Failed to fetch categories after retries");
        // Don't clear categories on failure, just log the error
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
      // Add retry logic for API calls with reduced frequency
      let retryCount = 0;
      const maxRetries = 2;
      let response;
      let data;

      while (retryCount < maxRetries) {
        try {
          response = await fetch(
            "https://maalem-backend-ybme.onrender.com/api/products",
          );

          if (response.ok) {
            data = await response.json();
            break;
          }

          // If not successful and we have retries left, wait and retry
          if (retryCount < maxRetries - 1) {
            retryCount++;
            console.log(`Retry ${retryCount} for products...`);
            await new Promise((resolve) =>
              setTimeout(resolve, 2000 * retryCount),
            );
          }
        } catch (error) {
          retryCount++;
          console.log(`Retry ${retryCount} for products due to error:`, error);
          if (retryCount < maxRetries) {
            await new Promise((resolve) =>
              setTimeout(resolve, 2000 * retryCount),
            );
          }
        }
      }

      if (response && response.ok && data) {
        setProducts(data);
        // Only signal other tabs if this is not the initial fetch
        if (!isInitialFetchRef.current) {
          localStorage.setItem("products-updated", Date.now().toString());
        }
      } else {
        console.error("Failed to fetch products after retries");
        // Don't clear products on failure, just log the error
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
        // Add debouncing to prevent rapid successive calls
        if (e.key === "categories-updated") {
          if (categoriesTimeoutRef.current) {
            clearTimeout(categoriesTimeoutRef.current);
          }
          categoriesTimeoutRef.current = setTimeout(() => {
            refreshCategories();
          }, 500);
        } else if (e.key === "products-updated") {
          if (productsTimeoutRef.current) {
            clearTimeout(productsTimeoutRef.current);
          }
          productsTimeoutRef.current = setTimeout(() => {
            refreshProducts();
          }, 500);
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
      // Clear the flag after a longer delay to prevent flickering
      setTimeout(() => {
        isInitialFetchRef.current = false;
      }, 2000); // Increased from 50ms to 2000ms
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
