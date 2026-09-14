/**
 * API Configuration for backend integration
 */

import axios from "axios";

const envBaseUrl = process.env.NEXT_PUBLIC_API_URL;
const rawBaseUrl = envBaseUrl && !envBaseUrl.startsWith("/") && envBaseUrl !== "/api"
  ? envBaseUrl
  : "https://api-ai-power-admin-console.onrender.com/api";

export const API_CONFIG = {
  baseURL: rawBaseUrl,
  companyId: process.env.NEXT_PUBLIC_COMPANY_ID || "COMP-000001",
};

// Global Axios configuration to pass the tenant domain automatically
axios.interceptors.request.use(async (config) => {
  if (typeof window !== "undefined") {
    config.headers["x-tenant-domain"] = window.location.hostname;
  } else {
    try {
      const { headers } = await import("next/headers");
      const reqHeaders = await headers();
      const domain = reqHeaders.get("x-tenant-domain") || reqHeaders.get("x-forwarded-host") || reqHeaders.get("host");
      if (domain) {
        config.headers["x-tenant-domain"] = domain;
      }
    } catch {
      // Ignore if called outside of request scope or in Edge runtime
    }
  }
  return config;
});

/**
 * Get the full API URL for an endpoint
 */
export const getApiUrl = (endpoint: string): string => {
  const base = API_CONFIG.baseURL.replace(/\/$/, "");
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${base}${path}`;
};

/**
 * Get headers for API requests with authentication
 */
export const getApiHeaders = (token?: string): Record<string, string> => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (typeof window !== "undefined") {
    headers["x-tenant-domain"] = window.location.hostname;
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
