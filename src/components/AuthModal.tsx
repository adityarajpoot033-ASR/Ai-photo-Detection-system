import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Magnetic from "./Magnetic";

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple mock login using localStorage logic from context
    login(email, name || email.split("@")[0]);
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setAuthModalOpen(false)}
          className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md glass rounded-[3rem] p-8 md:p-12 overflow-hidden"
        >
          {/* Background Glow */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 blur-[80px] rounded-full pointer-events-none" />

          <button 
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 flex items-center justify-center mb-6 shadow-xl">
              <ShieldCheck size={32} />
            </div>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-white mb-2">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-light">
              {isLogin ? "Access your forensic dashboard" : "Join the future of media authentication"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-slate-300 dark:focus:border-slate-700 outline-none transition-all text-slate-900 dark:text-white text-sm"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-slate-300 dark:focus:border-slate-700 outline-none transition-all text-slate-900 dark:text-white text-sm"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border border-transparent focus:border-slate-300 dark:focus:border-slate-700 outline-none transition-all text-slate-900 dark:text-white text-sm"
              />
            </div>

            <Magnetic>
              <button
                type="submit"
                className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center gap-3 shadow-xl hover:opacity-90 transition-opacity mt-4"
              >
                {isLogin ? "Sign In" : "Get Started"}
                <ArrowRight size={18} />
              </button>
            </Magnetic>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-500 dark:text-slate-400 text-xs hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {isLogin ? "Don't have an account? Create one" : "Already have an account? Sign in"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
