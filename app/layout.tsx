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
  title: "Al Maalem | Grill, Burgers & Delivery - أفضل مطعم للشوايا والبرجر",
  description:
    "Charcoal-grilled sandwiches, burgers, and plates — order online for delivery across Beirut & Mount Lebanon. مطعم متخصص في الشوايا المشوية على الفحم في بيروت وجبل لبنان.",
  keywords: [
    "Al Maalem",
    "grill restaurant",
    "charcoal grill",
    "burgers Beirut",
    "delivery Lebanon",
    "المعلم",
    "مطعم",
    "شوايا",
    "برجر",
    "سندويشات",
    "وجبات جاهزة",
    "توصيل طعام",
    "بيروت",
    "جبل لبنان",
    "مطعام لبنانية",
    "شواء مشوي",
    "برجر لبناني",
    "أفضل مطعم",
    "طلب أونلاين",
    "توصيل سريع",
    "Lebanese restaurant",
    "fast food Beirut",
    "charcoal grilled food",
  ],
  authors: [{ name: "Al Maalem Restaurant" }],
  creator: "Al Maalem Restaurant",
  publisher: "Al Maalem Restaurant",
  openGraph: {
    title: "Al Maalem | Grill, Burgers & Delivery - أفضل مطعم للشوايا",
    description:
      "Charcoal-grilled sandwiches, burgers, and plates — order online for delivery across Beirut & Mount Lebanon. مطعم متخصص في الشوايا المشوية على الفحم.",
    type: "website",
    locale: "en_US",
    siteName: "Al Maalem Restaurant",
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Maalem | Grill, Burgers & Delivery - أفضل مطعم للشوايا",
    description:
      "Charcoal-grilled sandwiches, burgers, and plates — order online for delivery across Beirut & Mount Lebanon. مطعم متخصص في الشوايا المشوية.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/Logo.png" sizes="32x32" />
        <link rel="icon" href="/Logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/Logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#c27a2c" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Al Maalem Restaurant",
              alternateName: "المعلم - Al Maalem",
              description:
                "Charcoal-grilled sandwiches, burgers, and plates — order online for delivery across Beirut & Mount Lebanon. مطعم متخصص في الشوايا المشوية على الفحم.",
              url: "https://your-domain.vercel.app",
              telephone: "+961-XX-XXXXXX",
              address: {
                "@type": "PostalAddress",
                addressCountry: "LB",
                addressLocality: "Beirut",
                addressRegion: "Mount Lebanon",
              },
              servesCuisine: ["Lebanese", "Grill", "Fast Food", "Burgers"],
              priceRange: "$$",
              openingHours: "Mo-Su 10:00-23:00",
              acceptsReservations: true,
              menu: "https://your-domain.vercel.app/menu",
            }),
          }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${bebasNeue.variable} ${notoArabic.variable} antialiased`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
