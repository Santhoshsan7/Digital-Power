"use client";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import OfferBar from "@/components/OfferBar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CartDrawer from "@/components/ui/CartDrawer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  // If it's an admin page, just render children without main site's Header/Footer
  if (isAdmin) {
    return (
      <div className="admin-root">
        <main>{children}</main>
      </div>
    );
  }

  // Standard website layout
  return (
    <>
      <OfferBar />
      <Suspense fallback={<div className="h-20 bg-white animate-pulse" />}>
        <Header />
      </Suspense>
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ScrollToTop />
      <CartDrawer />
    </>
  );
}
