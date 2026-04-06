import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Menu, X, Sun, Moon } from "lucide-react";
import Magnetic from "./Magnetic";

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? "py-4" : "py-10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className={`glass rounded-full px-8 py-4 flex items-center justify-between transition-all duration-700 ${
          isScrolled ? "shadow-2xl shadow-slate-200/40 dark:shadow-black/60 border-slate-200/80 dark:border-slate-800/80" : "bg-transparent border-transparent shadow-none"
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-slate-950 transition-all hover:rotate-12">
              <Shield size={24} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter dark:text-white transition-colors">VisionGuard</span>
          </div>

          <div className="hidden md:flex items-center gap-12">
            <nav className="flex items-center gap-10">
              {["Features", "Process", "Demo"].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav>
            
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 transition-colors" />

            <div className="flex items-center gap-8">
              <button 
                onClick={toggleTheme}
                className="p-2.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Magnetic>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:opacity-90 shadow-lg shadow-slate-200/20 dark:shadow-black/40">
                  Sign In
                </button>
              </Magnetic>
            </div>
          </div>

          <button 
            className="md:hidden p-2 text-slate-900 dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 p-6 md:hidden"
          >
            <div className="glass rounded-3xl p-8 flex flex-col gap-6">
              {["Features", "Process", "Demo"].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                  className="text-lg font-medium text-slate-900 dark:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              <div className="flex items-center justify-between">
                <button 
                  onClick={toggleTheme}
                  className="flex items-center gap-3 text-slate-900 dark:text-white"
                >
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                </button>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-6 py-3 rounded-full font-semibold">
                  Sign In
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
