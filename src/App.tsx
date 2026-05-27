/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import DemoSection from "./components/DemoSection";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import AuthModal from "./components/AuthModal";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-white dark:bg-slate-950 font-sans relative overflow-hidden transition-colors duration-500">
        {/* Background Layer */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {/* Noise Texture */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] mix-blend-overlay" 
               style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
          
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-slate-100/40 dark:bg-slate-900/10 rounded-full blur-[160px] animate-pulse" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-slate-50/40 dark:bg-slate-900/10 rounded-full blur-[160px] animate-pulse" style={{ animationDelay: '3s' }} />
          <div className="absolute top-[30%] right-[5%] w-[40%] h-[40%] bg-slate-100/20 dark:bg-slate-900/5 rounded-full blur-[140px] animate-pulse" style={{ animationDelay: '6s' }} />
        </div>

        <CustomCursor />
        <AuthModal />
        <Navbar isDark={isDark} toggleTheme={toggleTheme} />
        <main className="relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Hero />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Section Divider / Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <Features />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <HowItWorks />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
            <DemoSection />
          </motion.div>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

