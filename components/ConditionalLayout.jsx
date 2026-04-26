"use client";
import { useState, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import OfferBar from "@/components/OfferBar";
import ScrollToTop from "@/components/ui/ScrollToTop";
import CartDrawer from "@/components/ui/CartDrawer";

export default function ConditionalLayout({ children }) {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdmin = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";
  const isAuthPage = isAdmin || isLoginPage;

  if (isAuthPage) {
    return (
      <div className="admin-root" suppressHydrationWarning>
        <main>{children}</main>
      </div>
    );
  }

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
