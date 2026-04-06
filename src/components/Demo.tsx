import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Loader2, ShieldCheck, AlertCircle, RefreshCw, Sparkles, FileText } from "lucide-react";
import Magnetic from "./Magnetic";

export default function Demo() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<null | { type: "real" | "ai"; confidence: number }>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        analyzeImage();
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult({
        type: Math.random() > 0.5 ? "real" : "ai",
        confidence: Math.floor(Math.random() * 15) + 85, // 85-99%
      });
    }, 4000);
  };

  const reset = () => {
    setImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <section id="demo" className="section-padding relative overflow-hidden bg-slate-50/30 dark:bg-slate-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors">
            Experience the <span className="text-slate-400 dark:text-slate-600">Future.</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light transition-colors">
            Test our neural engine with your own assets.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-[3rem] p-4 md:p-6 relative overflow-hidden">
            {!image ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-video rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-6 group cursor-pointer hover:border-slate-400 dark:hover:border-slate-600 transition-all bg-slate-50/50 dark:bg-slate-900/20"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload className="text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" size={32} />
                </div>
                <div className="text-center">
                  <p className="text-slate-900 dark:text-white font-semibold mb-1">Drop your image here</p>
                  <p className="text-slate-400 text-sm font-light">Supports JPG, PNG, WebP up to 10MB</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </motion.div>
            ) : (
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-slate-950">
                <img src={image} alt="Upload" className="w-full h-full object-cover opacity-80" />
                
                <AnimatePresence>
                  {isAnalyzing && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-20"
                    >
                      {/* Scanning Line */}
                      <motion.div 
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 right-0 h-1 bg-linear-to-r from-transparent via-white to-transparent shadow-[0_0_20px_rgba(255,255,255,0.8)] z-30"
                      />
                      
                      {/* Neural Pulse Grid */}
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.05, 0.2, 0.05] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 z-10"
                        style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                      />
                      
                      {/* Neural Grid Overlay */}
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
                      
                      {/* Scanning Backdrop */}
                      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[4px]" />
                      
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
                        <div className="flex items-center gap-4 px-8 py-4 rounded-full glass-card border-white/20">
                          <Loader2 className="animate-spin text-white" size={24} />
                          <span className="text-white text-xs font-bold tracking-[0.4em] uppercase">Analyzing Neural Patterns</span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-80 h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5">
                          <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 4, ease: [0.16, 1, 0.3, 1] }}
                            className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-30 flex items-center justify-center p-8"
                  >
                    <div className="glass-card p-12 rounded-[3.5rem] max-w-lg w-full text-center relative overflow-hidden border-white/20">
                      {/* Result Glow */}
                      <div className={`absolute -inset-40 blur-[120px] opacity-30 pointer-events-none ${result.type === 'real' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      
                      <div className="relative z-10">
                        <div className={`w-24 h-24 rounded-[2rem] mx-auto mb-10 flex items-center justify-center ${result.type === 'real' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {result.type === 'real' ? <ShieldCheck size={48} /> : <AlertCircle size={48} />}
                        </div>
                        
                        <h4 className="text-[10px] uppercase tracking-[0.4em] text-slate-400 mb-3 font-bold">Verification Verdict</h4>
                        <div className="text-5xl font-bold dark:text-white mb-6 transition-colors tracking-tighter">
                          {result.type === 'real' ? 'Authentic' : 'Synthetic'}
                        </div>
                        
                        <div className="flex items-center justify-center gap-3 mb-12">
                          <Sparkles size={16} className="text-slate-400" />
                          <span className="text-slate-500 dark:text-slate-400 font-light text-lg">{result.confidence}% Confidence Score</span>
                        </div>

                        <div className="flex gap-5">
                          <Magnetic className="flex-1">
                            <button 
                              onClick={reset}
                              className="w-full py-5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm flex items-center justify-center gap-3 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                            >
                              <RefreshCw size={18} />
                              New Scan
                            </button>
                          </Magnetic>
                          <Magnetic className="flex-1">
                            <button 
                              className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-sm flex items-center justify-center gap-3 hover:opacity-90 transition-opacity"
                            >
                              <FileText size={18} />
                              Full Report
                            </button>
                          </Magnetic>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
