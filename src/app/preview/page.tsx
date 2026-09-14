"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import "./preview.css";

const themeNames: Record<string, string> = {
  "default": "Classic Store",
  "luxury-fashion": "Luxury Fashion",
  "minimal-tech": "Minimal Tech",
  "organic-grocery": "Organic Grocery",
  "urban-streetwear": "Urban Streetwear",
  "cozy-home": "Cozy Home"
};

function PreviewContent() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme") || "default";
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");

  useEffect(() => {
    // Set preview_theme cookie so storefront routes know which theme to render
    document.cookie = `preview_theme=${theme}; path=/; max-age=3600; SameSite=Lax`;
  }, [theme]);

  const handleClose = () => {
    // Explicitly clear the cookie on close
    document.cookie = "preview_theme=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };

  const activeThemeName = themeNames[theme] || theme;

  return (
    <div className="preview-container">
      {/* Top Navigation Bar */}
      <header className="preview-bar">
        {/* Left Side Info */}
        <div className="preview-bar-left">
          <span className="preview-logo">SquadCart</span>
          <div className="preview-theme-badge">
            Previewing: <strong>{activeThemeName}</strong>
          </div>
        </div>

        {/* Center Device Switcher */}
        <div className="device-toggles">
          <button
            className={`toggle-btn ${device === "desktop" ? "active" : ""}`}
            onClick={() => setDevice("desktop")}
            title="Desktop View"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
              <line x1="8" y1="21" x2="16" y2="21" />
              <line x1="12" y1="17" x2="12" y2="21" />
            </svg>
          </button>
          
          <button
            className={`toggle-btn ${device === "tablet" ? "active" : ""}`}
            onClick={() => setDevice("tablet")}
            title="Tablet View"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </button>
          
          <button
            className={`toggle-btn ${device === "mobile" ? "active" : ""}`}
            onClick={() => setDevice("mobile")}
            title="Mobile View"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
          </button>
        </div>

        {/* Right Actions */}
        <div className="preview-bar-right">
          <Link
            href="/"
            className="btn-close-preview"
            onClick={handleClose}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Close Preview
          </Link>
        </div>
      </header>

      {/* Frame Viewport */}
      <main className="preview-viewport">
        <div className={`iframe-wrapper device-${device}`}>
          <iframe
            src={`/themes/?theme=${theme}&preview=true`}
            title={`${activeThemeName} Live Preview`}
          />
        </div>
      </main>
    </div>
  );
}

export default function PreviewPage() {
  return (
    <Suspense fallback={<div className="preview-container"><div className="preview-viewport"><p style={{color: '#a0a0b0'}}>Loading preview...</p></div></div>}>
      <PreviewContent />
    </Suspense>
  );
}
