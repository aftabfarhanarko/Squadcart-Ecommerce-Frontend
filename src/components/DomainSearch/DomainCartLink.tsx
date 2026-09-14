"use client";
import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export default function DomainCartLink() {
  return (
    <Link 
      href="/domain-search/cart" 
      className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--primary-green)] hover:border-[var(--primary-green)]/40 transition-all duration-300"
    >
      <ShoppingCart size={16} />
    </Link>
  );
}
