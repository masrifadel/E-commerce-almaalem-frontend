"use client";
import { AppProvider } from "@/Contexts/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import LogoutButton from "@/components/UI/LogoutButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Add a small delay to ensure localStorage is ready
    const checkAuth = () => {
      console.log("🔑 Admin Layout Auth Check:");

      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      console.log("Token exists:", !!token);
      console.log("User exists:", !!user);
      console.log("Token value:", token);
      console.log("User value:", user);

      if (token && user) {
        try {
          const parsedUser = JSON.parse(user);
          console.log("Parsed user:", parsedUser);

          // If user is not admin, redirect to appropriate page
          if (parsedUser.role !== "admin") {
            console.error("❌ User is not admin:", parsedUser.role);
            toast.error("Access denied. Admin privileges required.");
            router.push("/login");
            return;
          }

          console.log("✅ Admin authentication successful");
          setIsChecking(false);
        } catch (error) {
          console.error("❌ Error parsing user data:", error);
          router.push("/login");
          setIsChecking(false);
        }
      } else {
        // No token or user data, redirect to login
        console.error("❌ No token or user data found");
        router.push("/login");
        setIsChecking(false);
      }
    };

    // Delay check to avoid race conditions
    setTimeout(checkAuth, 500);
  }, []);

  // Show loading state while checking authentication
  if (isChecking) {
    return (
      <AppProvider>
        <div className="min-h-screen bg-[#2e4a63] flex items-center justify-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </AppProvider>
    );
  }

  return (
    <AppProvider>
      <div className="min-h-screen bg-[#2e4a63]">
        {/* Admin Header */}
        <header className="bg-[#1a2f3f] shadow-sm border-b border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <LogoutButton isAdmin={true} />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>
    </AppProvider>
  );
}
