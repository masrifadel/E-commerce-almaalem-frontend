"use client";
import { AppProvider } from "@/Contexts/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in and has admin role
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);

        // If user is not admin, redirect to appropriate page
        if (parsedUser.role !== "admin") {
          toast.error("Access denied. Admin privileges required.");
          router.push("/profile");
          return;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
        return;
      }
    } else {
      // No token or user data, redirect to login
      router.push("/login");
      return;
    }
  }, []);

  return (
    <AppProvider>
      <div className="flex min-h-screen">
        {/* Main content */}
        <main className="flex-1   bg-[#2e4a63]  ">{children}</main>
      </div>
    </AppProvider>
  );
}
