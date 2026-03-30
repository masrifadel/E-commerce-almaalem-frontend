import { DM_Sans, Bebas_Neue, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata = {
  title: "Al Maalem | Grill, Burgers & Delivery",
  description:
    "Charcoal-grilled sandwiches, burgers, and plates — order online for delivery across Beirut & Mount Lebanon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} ${notoArabic.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
