import { Shield, Twitter, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Footer() {
  return (
    <footer className="py-32 border-t border-slate-100 dark:border-slate-900 transition-colors bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-full flex items-center justify-center text-white dark:text-slate-950 transition-colors">
                <Shield size={20} />
              </div>
              <span className="font-display font-bold text-xl tracking-tight dark:text-white transition-colors">VisionGuard</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm max-w-xs font-light leading-relaxed transition-colors">
              The global standard for digital asset verification and synthetic media detection.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:col-span-3 gap-12 sm:gap-24">
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] transition-colors">Product</h4>
              <nav className="flex flex-col gap-4">
                {["Features", "API", "Pricing", "Enterprise"].map((item) => (
                  <a key={item} href="#" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-light flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] transition-colors">Company</h4>
              <nav className="flex flex-col gap-4">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <a key={item} href="#" className="text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors font-light flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </nav>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-[0.3em] transition-colors">Social</h4>
              <div className="flex gap-4">
                {[Twitter, Github, Linkedin].map((Icon, i) => (
                  <div key={i}>
                    <Magnetic>
                      <a href="#" className="w-10 h-10 rounded-full border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-900 dark:hover:border-white transition-all">
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-6 text-slate-400 dark:text-slate-500 text-[11px] font-light transition-colors">
          <div className="flex items-center gap-8">
            <span>© {new Date().getFullYear()} VisionGuard AI Systems.</span>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
