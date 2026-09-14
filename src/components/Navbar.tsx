"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ShoppingBag,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Zap,
  Globe,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface NavChildItem {
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties }>;
  label: string;
  desc: string;
  href: string;
  color: string;
}

interface NavItem {
  label: string;
  labelBn: string;
  href: string;
  children?: NavChildItem[];
}

const navItems: NavItem[] = [
  {
    label: "Product",
    labelBn: "পণ্য",
    href: "#features",
    children: [
      { icon: LayoutDashboard, label: "Dashboard", desc: "Merchant control center", href: "#features", color: "#6366F1" },
      { icon: Package, label: "Products & Inventory", desc: "Catalog management", href: "#features", color: "#10B981" },
      { icon: BarChart3, label: "Analytics & Reports", desc: "Data-driven decisions", href: "#features", color: "#F59E0B" },
      { icon: Sparkles, label: "AI Insights", desc: "Intelligent commerce automation", href: "#features", color: "#8B5CF6" },
      { icon: Users, label: "CRM & Customers", desc: "Relationship management", href: "#features", color: "#06B6D4" },
      { icon: Globe, label: "Custom Domains", desc: "Your brand, your URL", href: "#features", color: "#EC4899" },
    ],
  },
  { label: "Features", labelBn: "ফিচার", href: "#features" },
  { label: "Pricing", labelBn: "মূল্য", href: "/pricing" },
  { label: "Integrations", labelBn: "ইন্টিগ্রেশন", href: "#integrations" },
];

const MegaMenu = ({ items, onClose, landingUrl }: { items: NavChildItem[]; onClose: () => void; landingUrl: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 8, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 8, scale: 0.98 }}
    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[640px] rounded-2xl p-4 shadow-2xl z-50 bg-[#111827] border border-[#1F2937] backdrop-blur-md"
  >
    <div className="grid grid-cols-2 gap-1">
      {items.map(({ icon: Icon, label, desc, href, color }) => {
        const fullHref = href.startsWith("#") ? `${landingUrl}/${href}` : href.startsWith("/") ? `${landingUrl}${href}` : href;
        return (
          <Link
            key={label}
            href={fullHref}
            onClick={onClose}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#1F2937] transition-colors group"
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
              style={{ background: color + "18" }}
            >
              <Icon size={17} style={{ color }} />
            </div>
            <div>
              <div className="text-[13px] font-semibold text-white group-hover:text-[#6366F1] transition-colors">
                {label}
              </div>
              <div className="text-[11px] text-[#94A3B8]">{desc}</div>
            </div>
          </Link>
        );
      })}
    </div>
    <div className="border-t border-[#1F2937] mt-3 pt-3 flex items-center justify-between">
      <span className="text-xs text-[#94A3B8]">Explore all features →</span>
      <Link
        href={`${landingUrl}/features`}
        className="text-xs font-semibold text-[#6366F1] hover:underline"
      >
        View full feature list
      </Link>
    </div>
  </motion.div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const isBn = language === "bn";

  const [landingUrl, setLandingUrl] = useState("https://squadcart.app");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.location.hostname === "localhost") {
        setLandingUrl("http://localhost:3000");
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 backdrop-blur-lg border-b border-[#1F2937] bg-[#0A0D14]/85 ${
          scrolled ? "py-2 shadow-lg" : "py-3"
        }`}
      >
        <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6366F1] via-[#8B5CF6] to-[#06B6D4] flex items-center justify-center shadow-lg">
              <ShoppingBag size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[17px] font-bold tracking-tight text-white">
                SquadCart
              </span>
              <span className="text-[9px] font-semibold tracking-widest text-[#94A3B8] uppercase">
                Commerce
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.children ? (
                  <button
                    className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-xl transition-colors
                      ${activeDropdown === item.label
                        ? "text-[#6366F1] bg-[#6366F1]/10"
                        : "text-[#CBD5E1] hover:text-white hover:bg-[#1F2937]"
                      }`}
                  >
                    {isBn ? item.labelBn : item.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href.startsWith("/") ? `${landingUrl}${item.href}` : `${landingUrl}/${item.href}`}
                    className="px-4 py-2 text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-[#1F2937] rounded-xl transition-colors"
                  >
                    {isBn ? item.labelBn : item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <MegaMenu items={item.children} onClose={() => setActiveDropdown(null)} landingUrl={landingUrl} />
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#1F2937] text-[#94A3B8] hover:border-[#6366F1] hover:text-[#6366F1] transition-all"
              aria-label="Toggle language"
            >
              {isBn ? "EN" : "বাং"}
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1F2937] transition-all"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              ) : (
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            <Link
              href={`${landingUrl}/login`}
              className="px-4 py-2 text-sm font-semibold text-[#CBD5E1] hover:text-white transition-colors"
            >
              {isBn ? "লগইন" : "Sign in"}
            </Link>
            <Link 
              href={`${landingUrl}/checkout`} 
              className="inline-flex items-center justify-center gap-2 font-semibold text-xs rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white px-4 py-2 transition-all shadow-md shadow-[#6366F1]/20 hover:scale-[1.02]"
            >
              {isBn ? "শুরু করুন" : "Get Started"}
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl text-[#94A3B8] hover:text-white hover:bg-[#1F2937] transition-all"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[95] w-[min(340px,90vw)] bg-[#0A0D14] border-l border-[#1F2937] shadow-2xl flex flex-col"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between p-5 border-b border-[#1F2937]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
                    <ShoppingBag size={15} className="text-white" />
                  </div>
                  <span className="font-bold text-[15px] text-white">SquadCart</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-xl text-[#94A3B8] hover:bg-[#1F2937] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Mobile nav items */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {item.children ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold text-white hover:bg-[#1F2937] transition-colors"
                        >
                          {isBn ? item.labelBn : item.label}
                          <ChevronDown
                            size={15}
                            className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.label && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden pl-3"
                            >
                              {item.children.map(({ icon: Icon, label, href, color }) => {
                                const fullHref = href.startsWith("#") ? `${landingUrl}/${href}` : href.startsWith("/") ? `${landingUrl}${href}` : href;
                                return (
                                  <Link
                                    key={label}
                                    href={fullHref}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2.5 p-2.5 rounded-lg text-sm text-[#CBD5E1] hover:text-white hover:bg-[#1F2937] transition-colors"
                                  >
                                    <Icon size={15} style={{ color }} />
                                    {label}
                                  </Link>
                                );
                              })}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href.startsWith("/") ? `${landingUrl}${item.href}` : `${landingUrl}/${item.href}`}
                        onClick={() => setMobileOpen(false)}
                        className="block p-3 rounded-xl text-sm font-semibold text-white hover:bg-[#1F2937] transition-colors"
                      >
                        {isBn ? item.labelBn : item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile footer */}
              <div className="p-4 border-t border-[#1F2937] space-y-2">
                <Link
                  href={`${landingUrl}/login`}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center border border-[#1F2937] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1F2937] transition-colors"
                >
                  {isBn ? "লগইন" : "Sign in"}
                </Link>
                <Link
                  href={`${landingUrl}/checkout`}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-[#4F46E5] text-white py-2.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  {isBn ? "শুরু করুন" : "Get Started Free"}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
