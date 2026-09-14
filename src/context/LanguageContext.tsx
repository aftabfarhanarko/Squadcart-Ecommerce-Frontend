"use client";
import React, { createContext, useState, useContext } from "react";

const LanguageContext = createContext({
  language: 'en',
  setLanguage: (lang: string) => {},
  toggleLanguage: () => {}
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    // Force English for demo
    setLanguage("en");
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      <div className="font-baiJamjuree">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
