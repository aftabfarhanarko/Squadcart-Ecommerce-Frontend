"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./gallery.css";

const themes = [
  {
    slug: "default",
    name: "Classic Store",
    description:
      "Clean, modern e-commerce theme with minimalist black & white aesthetics. Perfect for fashion, gadgets, and lifestyle brands.",
    thumbnail: "/theme-previews/default.png",
    tags: ["Minimal", "Responsive", "Fast"],
    status: "live" as const,
    href: "/preview/?theme=default",
  },
  {
    slug: "luxury-fashion",
    name: "Luxury Fashion",
    description:
      "Luxury-inspired design with rich aesthetics, sleek layouts, and refined typography. Ideal for high-end clothing, boutique fashion, and premium accessories.",
    thumbnail: "/theme-previews/theme_luxury_fashion_1774979335026.png",
    tags: ["Luxury", "Fashion", "Elegant"],
    status: "live" as const,
    href: "/preview/?theme=luxury-fashion",
  },
  {
    slug: "minimal-tech",
    name: "Minimal Tech",
    description:
      "Sleek, futuristic design with dark mode aesthetics and high-contrast accents. Designed for modern electronic stores, gadget shops, and software storefronts.",
    thumbnail: "/theme-previews/theme_minimal_tech_1774979358706.png",
    tags: ["Dark Mode", "Modern", "Gadgets"],
    status: "live" as const,
    href: "/preview/?theme=minimal-tech",
  },
  {
    slug: "organic-grocery",
    name: "Organic Grocery",
    description:
      "Fresh, vibrant green-themed layout designed for grocery, organic food stores, farms, and eco-friendly products.",
    thumbnail: "/theme-previews/theme_organic_grocery_1774979385899.png",
    tags: ["Fresh", "Green", "Organic"],
    status: "live" as const,
    href: "/preview/?theme=organic-grocery",
  },
  {
    slug: "urban-streetwear",
    name: "Urban Streetwear",
    description:
      "Edgy, bold layout with high-impact visuals, big typography, and dynamic details. Perfect for activewear, streetwear, and Gen-Z fashion brands.",
    thumbnail: "/theme-previews/theme_urban_streetwear_1774979465750.png",
    tags: ["Bold", "Streetwear", "Gen-Z"],
    status: "live" as const,
    href: "/preview/?theme=urban-streetwear",
  },
  {
    slug: "cozy-home",
    name: "Cozy Home",
    description:
      "Warm, aesthetic layout with soft neutral tones, perfect for home decor, furniture, craftsmanship, and lifestyle stores.",
    thumbnail: "/theme-previews/theme_cozy_home_1774979483839.png",
    tags: ["Warm", "Home Decor", "Cozy"],
    status: "live" as const,
    href: "/preview/?theme=cozy-home",
  },
];

export default function ThemesGallery() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  useEffect(() => {
    // Clear preview_theme cookie so normal settings take effect when in gallery
    document.cookie = "preview_theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }, []);

  return (
    <div className="themes-gallery">
      {/* ── Hero Section ── */}
      <div className="g-hero">
        <div className="g-badge">
          <span className="g-badge-dot" />
          Theme Marketplace
        </div>
        <h1 className="g-title">
          Choose Your
          <br />
          Perfect Storefront
        </h1>
        <p className="g-subtitle">
          Browse our collection of professionally designed e-commerce themes.
          Each theme is fully responsive, SEO-optimized, and ready to launch.
        </p>
      </div>

      {/* ── Theme Grid ── */}
      <div className="g-grid">
        {themes.map((theme, idx) => {
          const isLive = theme.status === "live";
          return (
            <div
              key={theme.slug}
              className="g-card"
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Thumbnail */}
              <div className="g-card-img-wrap">
                <Image
                  src={theme.thumbnail}
                  alt={`${theme.name} theme preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  style={{ objectFit: "cover", objectPosition: "top" }}
                  priority={idx === 0}
                />
                <div className="g-card-overlay">
                  {isLive ? (
                    <Link href={theme.href} className="g-preview-btn">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Live Preview
                    </Link>
                  ) : (
                    <span
                      className="g-preview-btn"
                      style={{ opacity: 0.6, cursor: "default" }}
                    >
                      Coming Soon
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="g-card-body">
                <div className="g-card-header">
                  <span className="g-card-name">{theme.name}</span>
                  {isLive ? (
                    <span className="g-status-live">
                      <span className="g-status-live-dot" />
                      Live
                    </span>
                  ) : (
                    <span className="g-status-soon">Soon</span>
                  )}
                </div>
                <p className="g-card-desc">{theme.description}</p>
                <div className="g-tags">
                  {theme.tags.map((tag) => (
                    <span key={tag} className="g-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div className="g-footer">
        <p className="g-footer-text">
          Want a custom theme?{" "}
          <a
            href="mailto:devs.ashikur@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="g-footer-link"
          >
            Contact Us →
          </a>
        </p>
      </div>
    </div>
  );
}
