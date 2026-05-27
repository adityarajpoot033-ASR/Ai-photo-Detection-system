import { motion } from "motion/react";
import Detector from "./Detector";

export default function DemoSection() {
  return (
    <section id="scanner" className="section-padding relative overflow-hidden bg-slate-50/30 dark:bg-slate-900/10 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors">
            Neural <span className="text-slate-400 dark:text-slate-600">Scanner.</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light transition-colors">
            Verify your media assets with our forensic engine.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Detector />
        </div>
      </div>
    </section>
  );
}
