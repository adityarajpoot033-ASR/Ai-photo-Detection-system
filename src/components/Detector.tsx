import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, Loader2, ShieldCheck, AlertCircle, RefreshCw, Sparkles, FileText, Lock } from "lucide-react";
import Magnetic from "./Magnetic";
import { useAuth } from "../context/AuthContext";
import { GoogleGenAI } from "@google/genai";

export default function Detector() {
  const { user, setAuthModalOpen } = useAuth();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [showReport, setShowReport] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const scanMessages = ["Analyzing pixels...", "Detecting patterns...", "Running AI model...", "Finalizing forensic report..."];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      setScanStep(0);
      interval = setInterval(() => {
        setScanStep((prev) => (prev < scanMessages.length - 1 ? prev + 1 : prev));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);
  const [result, setResult] = useState<null | { 
    id?: string;
    type: "real" | "ai"; 
    confidence: number; 
    isMock?: boolean;
    probabilities?: { ai: number; real: number };
    metrics?: {
      pixelConsistency: number;
      frequencyAnalysis: number;
      anatomicalIntegrity: number;
      metadataIntegrity: number;
    };
    source?: string;
    reason?: string;
  }>(null);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null); // Reset result when a new file is picked
      setShowReport(false);
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const analyzeImage = async () => {
    if (!file || !user) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setError(null);
    setShowReport(false);
    
    // Demo Mode: Instant/Simulated Analysis
    if (isDemoMode) {
      // Artificial delay for effect
      await new Promise(resolve => setTimeout(resolve, 3500));
      
      const isAI = true; // Always AI in demo mode as requested
      const confidence = Math.floor(Math.random() * 10) + 89;
      
      setResult({
        type: "ai",
        confidence,
        probabilities: {
          ai: confidence,
          real: 100 - confidence
        },
        source: "Neural Engine (Demo)",
        reason: "Forensic analysis detected non-natural pixel distribution and frequency domain anomalies consistent with Diffusion-based synthesis. Metadata signatures indicate synthetic origin."
      });
      setIsAnalyzing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/detect", {
        method: "POST",
        body: formData,
        redirect: "follow" 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to analyze image");
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.error("Analysis Error:", err);
      setError(err.message || "An unexpected error occurred during analysis.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setFile(null);
    setResult(null);
    setIsAnalyzing(false);
    setError(null);
    setShowReport(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Demo Mode Toggle */}
      <div className="flex items-center justify-between px-8 py-4 glass rounded-3xl border border-white/10">
        <div className="flex items-center gap-3">
          <div className={`w-2 h-2 rounded-full ${isDemoMode ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            System Status: {isDemoMode ? 'Demo Mode Active' : 'Real-time Analysis'}
          </span>
        </div>
        <button 
          onClick={() => setIsDemoMode(!isDemoMode)}
          className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${isDemoMode ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-slate-800 text-slate-400 border border-white/5'}`}
        >
          {isDemoMode ? 'Switch to Live' : 'Enable Demo'}
        </button>
      </div>

      <div className="glass rounded-[3rem] p-4 md:p-6 relative overflow-hidden">
        {!user ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="aspect-video rounded-[2.5rem] border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-6 bg-slate-50/50 dark:bg-slate-900/20"
              >
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center">
                  <Lock className="text-slate-400" size={32} />
                </div>
                <div className="text-center px-6">
                  <p className="text-slate-900 dark:text-white font-semibold mb-2">Authentication Required</p>
                  <p className="text-slate-400 text-sm font-light mb-8 max-w-xs mx-auto">Please sign in to access our high-precision forensic analysis tools.</p>
                  <Magnetic>
                    <button 
                      onClick={() => setAuthModalOpen(true)}
                      className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-xs uppercase tracking-widest shadow-xl"
                    >
                      Sign In to Scan
                    </button>
                  </Magnetic>
                </div>
              </motion.div>
            ) : !image ? (
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
                  onClick={(e) => {
                    // Reset value so same file can be uploaded again if needed
                    (e.target as HTMLInputElement).value = '';
                  }}
                />
              </motion.div>
            ) : (
              <div className={`relative rounded-[2.5rem] overflow-hidden bg-slate-950 group/img ${!result && !error && !isAnalyzing ? 'aspect-video' : 'min-h-[400px]'}`}>
                <img src={image} alt="Upload" className={`w-full h-full object-cover opacity-80 transition-all group-hover/img:opacity-60 ${result ? 'blur-sm scale-110' : ''}`} />
                
                {/* Click to re-upload overlay */}
                {!isAnalyzing && !result && (
                  <div 
                    className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest">
                      <RefreshCw size={14} />
                      Change Image
                    </div>
                  </div>
                )}

                <AnimatePresence>
                  {!isAnalyzing && !result && !error && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 z-20 flex items-center justify-center bg-slate-950/20 backdrop-blur-[2px]"
                    >
                      <div className="flex flex-col items-center gap-6">
                        <Magnetic>
                          <button 
                            onClick={analyzeImage}
                            className="px-10 py-5 rounded-full bg-white text-slate-950 font-bold text-sm shadow-2xl hover:scale-105 transition-transform flex items-center gap-3"
                          >
                            <Sparkles size={18} />
                            Check Image
                          </button>
                        </Magnetic>
                        <div className="flex items-center gap-6">
                          <button onClick={() => fileInputRef.current?.click()} className="text-white/80 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
                            Re-upload
                          </button>
                          <button onClick={reset} className="text-white/60 hover:text-white text-xs font-medium transition-colors">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

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
                        <div className="flex items-center gap-4 px-8 py-4 rounded-full glass-card border-white/20 min-w-[320px] justify-center">
                          <Loader2 className="animate-spin text-white" size={24} />
                          <AnimatePresence mode="wait">
                            <motion.span 
                              key={scanStep}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="text-white text-xs font-bold tracking-[0.4em] uppercase"
                            >
                              {scanMessages[scanStep]}
                            </motion.span>
                          </AnimatePresence>
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

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-30 flex items-center justify-center p-8 bg-slate-950/80 backdrop-blur-md"
                  >
                    <div className="text-center max-w-md">
                      <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 mx-auto mb-6 flex items-center justify-center">
                        <AlertCircle size={32} />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">Analysis Failed</h3>
                      <p className="text-white/60 text-sm mb-8">{error}</p>
                      <button 
                        onClick={reset}
                        className="px-8 py-3 rounded-full bg-white text-slate-950 font-bold text-xs uppercase tracking-widest"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                )}

                {result && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 z-30 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
                  >
                    <div className="glass-card p-6 md:p-10 rounded-[3rem] max-w-2xl w-full text-center relative border-white/20 my-auto">
                      {/* Result Glow */}
                      <div className={`absolute -inset-40 blur-[120px] opacity-30 pointer-events-none ${result.type === 'real' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-8">
                          <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${result.type === 'real' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                            {result.type === 'real' ? 'Authentic' : 'Synthetic'}
                          </div>
                          <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                            Source: {result.source || 'Neural Engine'}
                          </div>
                        </div>

                        <div className={`w-20 h-20 rounded-[1.5rem] mx-auto mb-6 flex items-center justify-center ${result.type === 'real' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {result.type === 'real' ? <ShieldCheck size={40} /> : <AlertCircle size={40} />}
                        </div>
                        
                        <div className="text-4xl font-bold dark:text-white mb-8 transition-colors tracking-tighter">
                          {result.type === 'real' ? 'Real Image' : 'AI Generated'}
                        </div>

                        {/* Circular Confidence Meter */}
                        <div className="relative w-48 h-48 mx-auto mb-10 flex items-center justify-center">
                          <svg className="w-full h-full -rotate-90">
                            <circle
                              cx="96"
                              cy="96"
                              r="88"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="12"
                              className="text-slate-100 dark:text-slate-800"
                            />
                            <motion.circle
                              cx="96"
                              cy="96"
                              r="88"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="12"
                              strokeDasharray="552.92"
                              initial={{ strokeDashoffset: 552.92 }}
                              animate={{ strokeDashoffset: 552.92 - (552.92 * result.confidence) / 100 }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                              className={result.type === 'real' ? 'text-emerald-500' : 'text-rose-500'}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.span 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1 }}
                              className="text-4xl font-bold dark:text-white"
                            >
                              {result.confidence}%
                            </motion.span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Confidence</span>
                          </div>
                        </div>

                        {/* Probability Bars */}
                        {result.probabilities && (
                          <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span>AI Generated</span>
                                <span>{result.probabilities.ai}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.probabilities.ai}%` }}
                                  className="h-full bg-rose-500"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                <span>Real Photo</span>
                                <span>{result.probabilities.real}%</span>
                              </div>
                              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${result.probabilities.real}%` }}
                                  className="h-full bg-emerald-500"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {result.reason && (
                          <div className="mb-8 p-4 rounded-2xl bg-slate-900/40 border border-white/5 text-left">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Forensic Reasoning</div>
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                              {result.reason}
                            </p>
                          </div>
                        )}

                        {result.isMock && (
                          <div className="mb-8 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-500 uppercase tracking-widest font-bold">
                            Demo Mode: API Keys Not Set
                          </div>
                        )}

                        <div className="flex justify-center gap-3">
                          <Magnetic>
                            <button 
                              onClick={analyzeImage}
                              className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                              title="Refresh Analysis"
                            >
                              <RefreshCw size={16} />
                              <span className="ml-2">Refresh</span>
                            </button>
                          </Magnetic>
                          <Magnetic>
                            <button 
                              onClick={reset}
                              className="p-4 rounded-2xl bg-rose-500/10 text-rose-500 font-bold text-xs flex items-center justify-center hover:bg-rose-500/20 transition-all"
                              title="Clear & New Scan"
                            >
                              <RefreshCw size={16} className="rotate-45" />
                              <span className="ml-2">New Scan</span>
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

        {/* Detailed Report Modal/Section */}
        <AnimatePresence>
          {showReport && result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-6 glass rounded-[2.5rem] p-8 md:p-12 border border-white/10"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-bold dark:text-white tracking-tight">Forensic Analysis Report</h2>
                <button 
                  onClick={() => setShowReport(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <RefreshCw size={20} className="rotate-45" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
                    <img src={image!} alt="Analyzed" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-900/40 border border-white/5">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Metadata Analysis</div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">File Name</span>
                        <span className="text-white font-mono">{file?.name}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">File Size</span>
                        <span className="text-white font-mono">{(file!.size / 1024).toFixed(2)} KB</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">MIME Type</span>
                        <span className="text-white font-mono">{file?.type}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8 text-left">
                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Detection Summary</h3>
                    <div className={`p-6 rounded-3xl border ${result.type === 'real' ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${result.type === 'real' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'}`}>
                          {result.type === 'real' ? <ShieldCheck size={24} /> : <AlertCircle size={24} />}
                        </div>
                        <div>
                          <div className="text-lg font-bold dark:text-white">{result.type === 'real' ? 'Authentic Capture' : 'Synthetic Generation'}</div>
                          <div className="text-xs text-slate-400">Confidence: {result.confidence}%</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {result.reason}
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Neural Diagnostics</h3>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span>Pixel Consistency</span>
                          <span>{result.metrics?.pixelConsistency || (result.type === 'real' ? '98' : '42')}%</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${result.type === 'real' ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                            style={{ width: `${result.metrics?.pixelConsistency || (result.type === 'real' ? 98 : 42)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span>Frequency Domain Analysis</span>
                          <span>{result.metrics?.frequencyAnalysis || (result.type === 'real' ? '95' : '31')}%</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${result.type === 'real' ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                            style={{ width: `${result.metrics?.frequencyAnalysis || (result.type === 'real' ? 95 : 31)}%` }}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-medium text-slate-300">
                          <span>Anatomical Integrity</span>
                          <span>{result.metrics?.anatomicalIntegrity || (result.type === 'real' ? '100' : '65')}%</span>
                        </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${result.type === 'real' ? 'bg-emerald-500' : 'bg-rose-500'}`} 
                            style={{ width: `${result.metrics?.anatomicalIntegrity || (result.type === 'real' ? 100 : 65)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex gap-3">
                      <button 
                        onClick={analyzeImage}
                        className="flex-1 py-4 rounded-2xl bg-slate-800 text-white font-bold text-sm flex items-center justify-center hover:bg-slate-700 transition-all"
                        title="Refresh Analysis"
                      >
                        <RefreshCw size={18} className="mr-2" />
                        Refresh
                      </button>
                      <button 
                        onClick={reset}
                        className="flex-1 py-4 rounded-2xl bg-rose-500/10 text-rose-500 font-bold text-sm flex items-center justify-center hover:bg-rose-500/20 transition-all"
                        title="Clear & New Scan"
                      >
                        <RefreshCw size={18} className="rotate-45 mr-2" />
                        New Scan
                      </button>
                    </div>
                    <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-medium">
                      Report ID: {result.id || `FORENSIC-${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
}
