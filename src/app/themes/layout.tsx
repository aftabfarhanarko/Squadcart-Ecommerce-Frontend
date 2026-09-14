import React from "react";
import Navbar from "@/components/Navbar";

export default function ThemesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="themes-root">
      <Navbar />
      {children}
    </div>
  );
}
