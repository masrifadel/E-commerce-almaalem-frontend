"use client";
import { AppProvider } from "@/Contexts/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import LogoutButton from "@/components/UI/LogoutButton";

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
