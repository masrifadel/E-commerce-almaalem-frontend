"use client";
import { createContext, useContext, useState, useEffect } from "react";

type AppContextType = {
  data: any[];
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: {
    name: string;
    path: string;
    imageUrl: string;
  }[];
  setCategories: React.Dispatch<
    React.SetStateAction<
      {
        name: string;
        path: string;
        imageUrl: string;
      }[]
    >
  >;
  fetchData: boolean;
  setFetchData: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [fetchData, setFetchData] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<
    { name: string; path: string; imageUrl: string }[]
  >([]);

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
        setFetchData,
        fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used inside AppProvider");
  return context;
};
