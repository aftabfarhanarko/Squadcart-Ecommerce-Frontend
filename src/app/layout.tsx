import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { theme } from "@/theme/antd";
import { baiJamjuree } from "@/app/fonts";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "SquadCart Themes",
  description: "E-commerce themes by SquadCart",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
      </head>
      <body
        className={`${baiJamjuree.variable} font-baiJamjuree antialiased`}
      >
        <ConfigProvider theme={theme}>
          <ThemeProvider>
            <LanguageProvider>
              <AuthProvider>
                <Toaster />
                <CartProvider>
                  <AntdRegistry>
                    <div className="min-h-screen">{children}</div>
                  </AntdRegistry>
                </CartProvider>
              </AuthProvider>
            </LanguageProvider>
          </ThemeProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
