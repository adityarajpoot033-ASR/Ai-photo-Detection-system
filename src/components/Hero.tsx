import { motion } from "motion/react";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Magnetic from "./Magnetic";
import TiltCard from "./TiltCard";

export default function Hero() {
  return (
    <section className="relative pt-48 pb-32 lg:pt-64 lg:pb-48 overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200/50 dark:border-slate-800/50 text-slate-600 dark:text-slate-400 text-[10px] font-semibold tracking-[0.2em] uppercase mb-10 backdrop-blur-sm transition-colors">
              <Sparkles size={12} className="text-slate-900 dark:text-white" />
              <span>Next-Gen Media Authentication</span>
            </div>
            
            <h1 className="font-display text-6xl md:text-[8rem] font-bold tracking-tight text-slate-900 dark:text-white mb-10 leading-[0.85] transition-colors text-balance">
              Digital Truth <br />
              <span className="text-slate-400 dark:text-slate-600">Reimagined.</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-14 leading-relaxed font-light transition-colors text-balance">
              VisionGuard leverages state-of-the-art neural networks to distinguish between human-captured and AI-generated media with 99.9% accuracy.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Magnetic>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('scanner')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full sm:w-auto bg-slate-900 dark:bg-white text-white dark:text-slate-950 px-12 py-6 rounded-full font-semibold text-sm transition-all shadow-[0_20px_40px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_40px_-12px_rgba(255,255,255,0.1)] flex items-center justify-center gap-3"
                >
                  Get Started
                  <ArrowRight size={16} />
                </motion.button>
              </Magnetic>
            </div>

            {/* Trusted By Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-24 flex flex-col items-center gap-8"
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Trusted by Industry Leaders</span>
              <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale dark:invert transition-all">
                {["Meta", "Adobe", "Reuters", "NVIDIA"].map((brand) => (
                  <span key={brand} className="font-display text-xl font-bold tracking-tighter">{brand}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image / Preview with 3D Tilt Effect */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-40 lg:mt-56 w-full max-w-6xl"
          >
            <TiltCard className="w-full">
              <div className="relative glass rounded-[4rem] p-4 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.2)] dark:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.6)] overflow-hidden group">
                <div className="absolute inset-0 bg-linear-to-b from-slate-950/40 via-transparent to-slate-950/60 z-10 pointer-events-none rounded-[4rem]" />
                <img 
                  src="https://picsum.photos/seed/vision/1600/900?grayscale" 
                  alt="VisionGuard Interface" 
                  className="rounded-[3.5rem] w-full object-cover grayscale opacity-95 dark:opacity-60 transition-all duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Text Overlay */}
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 }}
                    className="max-w-2xl"
                  >
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                      Detect AI-Generated <br />
                      <span className="text-slate-300">Images Instantly.</span>
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base font-light max-w-lg mx-auto leading-relaxed">
                      Upload any image and verify whether it is real or AI-generated using advanced neural forensic detection.
                    </p>
                  </motion.div>
                </div>
                
                {/* Floating UI Elements inside TiltCard for Parallax Depth */}
                <div 
                  className="absolute -top-12 -right-12 hidden lg:block z-20"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <div className="glass-card p-8 rounded-[2.5rem] flex items-center gap-5 shadow-2xl">
                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center">
                      <ShieldCheck size={28} />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">Status</div>
                      <div className="text-base font-semibold dark:text-white">Secure Assets</div>
                    </div>
                  </div>
                </div>

                <div 
                  className="absolute -bottom-10 -left-10 hidden lg:block z-20"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <div className="glass-card p-6 rounded-[2rem] flex items-center gap-4 shadow-2xl">
                    <div className="w-10 h-10 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
                      <Sparkles size={20} />
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] uppercase tracking-widest text-slate-400 mb-1">AI Accuracy</div>
                      <div className="text-sm font-semibold dark:text-white">99.9% Precision</div>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
