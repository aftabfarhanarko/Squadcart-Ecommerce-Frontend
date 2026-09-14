"use client";

import Logo from "../../public/images/logo.png";
import PaymentGateway from "../../public/images/payment-gateway.webp";
import { useAuth } from "../context/AuthContext";
import { API_CONFIG } from "../lib/api-config";
import { getCategories, getSystemUserByCompanyId } from "../lib/api-services";
import { Category } from "../types/category";
import { SystemUser } from "../types/system-user";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaPinterest,
  FaTiktok,
  FaXTwitter,
} from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";

const Footer = () => {
  const { userSession } = useAuth();
  const [companyInfo, setCompanyInfo] = useState<SystemUser | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  const companyId = useMemo(
    () => userSession?.companyId || API_CONFIG.companyId,
    [userSession?.companyId],
  );

  useEffect(() => {
    let mounted = true;
    const loadCompanyInfo = async () => {
      if (!companyId) return;
      const data = await getSystemUserByCompanyId(companyId);
      if (mounted && data) {
        setCompanyInfo(data);
      }
    };
    loadCompanyInfo();
    return () => {
      mounted = false;
    };
  }, [companyId]);

  useEffect(() => {
    let mounted = true;
    const loadCategories = async () => {
      const data = await getCategories(companyId);
      if (mounted && Array.isArray(data) && data.length) {
        setCategories(data);
      }
    };
    loadCategories();
    return () => {
      mounted = false;
    };
  }, [companyId]);

  const companyName = companyInfo?.companyName || "SquadCart";
  const branchLocation =
    companyInfo?.branchLocation || "123 Business Avenue, Digital City, Worldwide.";
  const phone = companyInfo?.phone || "(+880) 1774 617 452";
  const email = companyInfo?.email || "support@squadcart.com";
  const logoSrc = companyInfo?.companyLogo;
  
  const fallbackCategories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Home & Garden", slug: "home-garden" },
    { name: "Sports", slug: "sports" },
    { name: "Accessories", slug: "accessories" },
  ];
  
  const visibleCategories = categories.length ? categories : fallbackCategories;

  return (
    <footer className="bg-[#111111] text-gray-400 font-baiJamjuree">
      <div className="max-w-7xl mx-auto py-20 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="flex flex-col gap-6">
            <Link href="/">
              {logoSrc ? (
                <Image src={logoSrc} alt="logo" width={150} height={60} unoptimized className="brightness-200" />
              ) : (
                <div className="text-white text-3xl font-black italic tracking-tighter">
                    SQUAD<span className="text-primary">CART</span>
                </div>
              )}
            </Link>
            <p className="text-sm leading-relaxed">
              <strong>{companyName}</strong> – Your premier destination for premium lifestyle products. We provide high-quality items with lightning-fast delivery and unparalleled customer satisfaction.
            </p>
            <div className="space-y-2 text-sm">
                <p className="hover:text-white transition-colors cursor-pointer">{branchLocation}</p>
                <p className="text-primary font-bold">{phone}</p>
            </div>
            <div className="flex gap-3 pt-4">
              {[
                { icon: <FaFacebookF />, link: "#" },
                { icon: <FaXTwitter />, link: "#" },
                { icon: <FaInstagram />, link: "#" },
                { icon: <FaTiktok />, link: "#" },
                { icon: <FaPinterest />, link: "#" },
                { icon: <MdOutlineEmail />, link: `mailto:${email}` },
              ].map((social, idx) => (
                <Link
                  key={idx}
                  href={social.link}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-lg hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest border-l-4 border-primary pl-4">Categories</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {visibleCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/products?category=${category.slug}`}
                    className="hover:text-primary hover:translate-x-2 transition-all inline-block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest border-l-4 border-primary pl-4">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Collections", href: "/products" },
                { name: "About Us", href: "/about-us" },
                { name: "Search", href: "/products" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary hover:translate-x-2 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-8">
            <h3 className="text-white font-bold text-lg uppercase tracking-widest border-l-4 border-primary pl-4">Help Center</h3>
            <ul className="flex flex-col gap-3 text-sm">
              {[
                { name: "My Dashboard", href: "/my-account/dashboard" },
                { name: "My Orders", href: "/my-account/orders" },
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Contact Support", href: "/contact-us" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-primary hover:translate-x-2 transition-all inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/5 bg-black/50">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">
            Copyright © 2026 <span className="text-white font-bold">{companyName}</span>. All rights reserved.
          </p>
          <div className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <Image
              src={PaymentGateway}
              alt="Payment Methods"
              width={400}
              height={100}
              className="h-8 w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
