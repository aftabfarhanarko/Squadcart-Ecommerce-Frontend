"use client";
import { motion } from "framer-motion";
import React from "react";

export default function SmoothButton({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={className}>
      <motion.button
        className="px-6 py-2.5 bg-[#39ff14] rounded-lg text-black text-md shadow-2xl font-bold border border-[#39ff14]/20"
        initial={{ scale: 1 }}
        whileHover={{
          scale: 1.05,
          boxShadow: "0 0 30px rgba(57, 255, 20, 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 15px rgba(57, 255, 20, 0.2)",
            "0 0 30px rgba(57, 255, 20, 0.4)",
            "0 0 15px rgba(57, 255, 20, 0.2)",
          ],
        }}
        transition={{
          scale: {
            type: "spring",
            stiffness: 200,
            damping: 15,
          },
          boxShadow: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        {children}
      </motion.button>
    </div>
  );
}
