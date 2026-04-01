"use client";
import { createContext, useContext, useState, useEffect } from "react";

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
  refreshTrigger: boolean;
  setRefreshTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: boolean;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
  categoriesLoading: boolean;
  setCategoriesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  productsLoading: boolean;
  setProductsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshCategories: () => void;
  refreshProducts: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [fetchData, setFetchData] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<
    {
      _id: string;
      name: string;
      path: string;
      imageUrl: string;
    }[]
  >([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);

  // Simple fetch functions for categories and products
  const refreshCategories = async () => {
    try {
      const response = await fetch("https://maalem-backend-ybme.onrender.com/api/category");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
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
        setProducts(data);
        // Only signal other tabs if this is not the initial fetch
        if (!isInitialFetchRef.current) {
          localStorage.setItem("products-updated", Date.now().toString());
        }
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Failed to refresh products:", error);
    } finally {
      // Clear loading state
      setProductsLoading(false);
    }
  };

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
    // Initial fetch on mount - no cart needed for guest ordering
    isInitialFetchRef.current = true;
    const timer = setTimeout(() => {
      refreshCategories();
      refreshProducts();
      // Clear flag after a longer delay to prevent flickering
      setTimeout(() => {
        isInitialFetchRef.current = false;
      }, 2000);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Simple cart state management for guest ordering
  useEffect(() => {
    // Only save to localStorage for guest users (no authentication)
    localStorage.setItem("cart", JSON.stringify(data));
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
