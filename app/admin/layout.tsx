import { AppProvider } from "@/Contexts/AppContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <div className="flex min-h-screen">
        {/* Main content */}
        <main className="flex-1   bg-[#2e4a63]  ">{children}</main>
      </div>
    </AppProvider>
  );
}
