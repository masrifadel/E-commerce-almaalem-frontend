import { AppProvider } from "@/Contexts/AppContext";
import Header from "@/components/Common/Header";
import Footer from "@/components/Common/Footer";
import { Toaster } from "sonner";

export default function MaalemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <Toaster position="top-center" richColors closeButton />
      <div className="maalem-main min-h-dvh flex flex-col bg-page">
        <Header />
        <main
          className="flex-1 w-full"
          style={{
            backgroundImage: "url('/tableye.png')",
          }}
        >
          {children}
        </main>
        <Footer />
      </div>
    </AppProvider>
  );
}
