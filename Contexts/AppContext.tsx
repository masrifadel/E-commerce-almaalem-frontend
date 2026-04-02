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
      const response = await fetch("/api/category");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const refreshProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  // Initialize cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        setData(cartItems);
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Simple cart state management for guest ordering
  useEffect(() => {
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
        products,
        setProducts,
        refreshTrigger,
        setRefreshTrigger,
        fetchData,
        setFetchData,
        categoriesLoading,
        setCategoriesLoading,
        productsLoading,
        setProductsLoading,
        refreshCategories,
        refreshProducts,
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
