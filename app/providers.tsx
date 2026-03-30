"use client";

import { AppProvider } from "@/Contexts/AppContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <AppProvider>{children}</AppProvider>;
}
