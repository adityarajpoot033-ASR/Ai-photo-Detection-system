import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Upload Asset",
    description: "Drag and drop any image or video into our secure verification portal."
  },
  {
    number: "02",
    title: "Neural Scan",
    description: "Our AI engines perform millions of forensic checks across the media spectrum."
  },
  {
    number: "03",
    title: "Verdict",
    description: "Receive a comprehensive authenticity report with confidence scores."
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-32">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors">
            Simple. <span className="text-slate-400 dark:text-slate-600">Powerful.</span>
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-light transition-colors">
            Three steps to absolute media integrity.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-[40px] left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent hidden lg:block" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-20 h-20 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-12 shadow-sm group-hover:scale-110 group-hover:rotate-6 group-hover:border-slate-900 dark:group-hover:border-white transition-all duration-700">
                  <span className="font-display text-3xl font-bold text-slate-900 dark:text-white transition-colors">{step.number}</span>
                </div>
                <h3 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 transition-colors tracking-tight">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-light leading-relaxed transition-colors max-w-[280px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
