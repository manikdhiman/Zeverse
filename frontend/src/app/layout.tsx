import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; // Direct uniform anchor
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zeverse | Premium Statement Jewelry",
  description: "Handcrafted anti-tarnish luxury jewelry collections",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <CartProvider>
            {/* ✅ FIXED: Render universal responsive headers smoothly for all pages */}
            <Header />
            
            <main style={{ minHeight: '80vh', position: 'relative' }}>
              {children}
            </main>
            
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}