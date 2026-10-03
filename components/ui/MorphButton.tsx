"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";

interface MorphButtonProps {
  className?: string;
  showLabel?: boolean;
}

export function MorphButton({ className = "", showLabel = true }: MorphButtonProps) {
  const { theme, toggleTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  // In dark mode, clicking switches to light (Sun). In light mode, clicking switches to dark (Moon).
  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      data-cursor="link"
      className={`relative flex items-center justify-center h-[36px] ${
        showLabel ? "px-4 sm:px-5" : "w-[36px] px-0"
      } rounded-[40px] bg-white/50 hover:bg-white/80 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-[#0b0b14] dark:text-white border border-white/80 dark:border-white/10 shadow-sm backdrop-blur-md cursor-pointer transition-colors duration-300 ${className}`}
    >
      <div className="relative w-[16px] h-[16px] flex items-center justify-center shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {isDark ? (
            <motion.div
              key="sun-icon"
              initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: 45 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center text-amber-400"
            >
              <Sun className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div
              key="moon-icon"
              initial={{ scale: 0.5, opacity: 0, rotate: 45 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotate: -45 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute inset-0 flex items-center justify-center text-[#0b0b14]"
            >
              <Moon className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLabel && (
        <span className="font-mono text-xs font-semibold tracking-wider uppercase ml-2 select-none">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </motion.button>
  );
}

export default MorphButton;
