import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { Suspense } from "react";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { CartProvider } from "@/lib/CartContext";
import { WishlistProvider } from "@/lib/WishlistContext";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Digital Power - Inverters, Batteries & UPS in Chennai",
  description: "Shop premium inverters, batteries, and UPS from Microtek, Luminous, Exide. Best prices in Chennai with free installation and 5-year warranty.",
  keywords: ["Inverter", "Battery", "UPS", "Chennai", "Microtek", "Luminous", "Exide", "Free Installation", "5-Year Warranty"],
};

import OfferBar from "@/components/OfferBar";
import CartDrawer from "@/components/ui/CartDrawer";

import ConditionalLayout from "@/components/ConditionalLayout";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} ${inter.variable} font-sans bg-gray-50 text-gray-900 antialiased`} suppressHydrationWarning>
        <CartProvider>
          <WishlistProvider>
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}

