import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CartDrawer } from "../components/CartDrawer";

export const metadata: Metadata = {
  title: "Zeverse | Handcrafted Quirky & Premium Jewelry",
  description: "Discover Zeverse's unique collection of statement earrings, necklaces, rings, cuffs, and brooches. Handcrafted, anti-tarnish, and hypoallergenic designs to add a little extra charm to your look.",
  keywords: "jewelry, earrings, rings, necklaces, cuffs, handmade jewelry, anti-tarnish, premium accessories",
  openGraph: {
    title: "Zeverse | Handcrafted Quirky & Premium Jewelry",
    description: "Discover Zeverse's unique collection of statement earrings, necklaces, rings, cuffs, and brooches.",
    url: "https://zeverse.com",
    siteName: "Zeverse Jewelry",
    locale: "en_IN",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main style={{ minHeight: "60vh", display: "flex", flexDirection: "column" }}>
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
