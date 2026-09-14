"use client";
import React, { Suspense, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import FlashSaleBanner from "@/components/FlashSaleBanner";
import { usePathname, useSearchParams } from "next/navigation";

function StoreLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isAuthPage = pathname?.includes("/login") || pathname?.includes("/register");

  const themeParam = searchParams?.get("theme");
  const [isCustomTheme, setIsCustomTheme] = useState(false);

  useEffect(() => {
    const getCookie = (name: string) => {
      if (typeof document === "undefined") return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };
    const previewTheme = getCookie("preview_theme");
    const activeTheme = themeParam || previewTheme;
    const customThemes = [
      "luxury-fashion",
      "minimal-tech",
      "organic-grocery",
      "urban-streetwear",
      "cozy-home",
    ];

    if (activeTheme && customThemes.includes(activeTheme) && pathname === "/") {
      setIsCustomTheme(true);
    } else {
      setIsCustomTheme(false);
    }
  }, [themeParam, pathname]);

  if (isAuthPage) {
    return <div className="min-h-screen">{children}</div>;
  }

  if (isCustomTheme) {
    return <div className="min-h-screen antialiased">{children}</div>;
  }

  return (
    <div className="min-h-screen antialiased bg-white flex flex-col justify-between">
      <FlashSaleBanner />
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <BottomNav />
    </div>
  );
}

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<div className="min-h-screen">{children}</div>}>
      <StoreLayoutContent>{children}</StoreLayoutContent>
    </Suspense>
  );
}

