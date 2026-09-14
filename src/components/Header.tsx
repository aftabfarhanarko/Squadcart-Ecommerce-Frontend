"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { FaBars, FaXmark } from "react-icons/fa6";
import Logo from "../../public/images/logo.png";
import { cn } from "../utils/cn";
import ProfileDropDown from "./drop down/PrfofileDropDown";
import CartDrawer from "./shopping cart/CartDrawer";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    const query = searchTerm.trim();
    if (!query) return;
    const params = new URLSearchParams();
    params.set("search", query);
    router.push(`/products?${params.toString()}`);
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 font-baiJamjuree border-b border-gray-100">
      <div className="max-w-7xl px-6 mx-auto flex items-center justify-between gap-8 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
            <div className="flex items-center">
                <div className="text-gray-900 text-2xl font-black italic tracking-tighter">
                   SQUAD<span className="text-primary">CART</span>
                </div>
            </div>
        </Link>

        {/* Search Bar - Premium Style */}
        <div className="hidden md:flex flex-1 max-w-lg items-center bg-gray-50 rounded-full border border-gray-200 px-4 py-1.5 focus-within:border-primary transition-all shadow-inner">
          <CiSearch className="text-gray-400 text-xl flex-shrink-0" />
          <input
            type="text"
            placeholder="Search for premium products..."
            className="w-full border-none outline-none bg-transparent px-3 py-1 text-sm text-gray-700 placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="bg-primary text-white px-5 py-1.5 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all shadow-md active:scale-95"
          >
            SEARCH
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden min-[1100px]:flex items-center gap-2">
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                        "text-sm font-bold px-3 py-2 rounded-lg transition-all border-b-2 border-transparent hover:text-primary",
                        pathname === link.href ? "text-primary border-primary" : "text-gray-600"
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-4">
            <div className="hidden sm:block">
                <CartDrawer />
            </div>
            <div className="hidden sm:block cursor-pointer">
                <ProfileDropDown />
            </div>
            
            <button
              onClick={() => setToggle(!toggle)}
              className="p-2 min-[1100px]:hidden text-2xl text-gray-700 hover:text-primary transition-colors"
            >
              {toggle ? <FaXmark /> : <FaBars />}
            </button>
        </div>
      </div>

      {/* Mobile Menu - Premium Slide Out */}
      <div
        className={cn(
          "absolute top-full left-0 right-0 bg-white shadow-2xl transition-all duration-300 transform origin-top border-t border-gray-100 min-[1100px]:hidden overflow-hidden",
          toggle ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        )}
      >
        <div className="flex flex-col p-6 gap-2">
            {/* Mobile Search */}
            <div className="flex md:hidden items-center bg-gray-50 rounded-xl border border-gray-200 px-4 py-2 mb-4">
              <CiSearch className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full border-none outline-none bg-transparent px-3 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {navLinks.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setToggle(false)}
                    className={cn(
                        "text-base font-bold p-3 rounded-xl transition-all flex items-center justify-between",
                        pathname === link.href ? "bg-primary/5 text-primary" : "text-gray-700 hover:bg-gray-50"
                    )}
                >
                    {link.name}
                    <div className={cn("w-1.5 h-1.5 rounded-full", pathname === link.href ? "bg-primary" : "bg-transparent")} />
                </Link>
            ))}
            
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-100 sm:hidden">
                <ProfileDropDown />
                <CartDrawer />
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
