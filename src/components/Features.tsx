import { motion } from "motion/react";
import { Shield, Zap, Eye, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Neural Verification",
    description: "Multi-layered analysis using deep neural networks to identify synthetic patterns invisible to the human eye.",
    color: "bg-blue-500/10 text-blue-500"
  },
  {
    icon: Zap,
    title: "Real-time Detection",
    description: "Get results in milliseconds. Our optimized inference engine processes high-resolution media instantly.",
    color: "bg-amber-500/10 text-amber-500"
  },
  {
    icon: Eye,
    title: "Forensic Insights",
    description: "Detailed breakdown of manipulation markers, including GAN artifacts and diffusion-based inconsistencies.",
    color: "bg-purple-500/10 text-purple-500"
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description: "Bank-grade encryption for all uploaded assets. We prioritize your privacy and data integrity above all.",
    color: "bg-emerald-500/10 text-emerald-500"
  }
];

export default function Features() {
  return (
    <section id="features" className="section-padding bg-slate-50/50 dark:bg-slate-900/20 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 transition-colors">
              Engineered for <br />
              <span className="text-slate-400 dark:text-slate-600">Absolute Certainty.</span>
            </h2>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-light transition-colors">
              Our platform combines forensic science with advanced AI to provide the most reliable media authentication suite available.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-10 rounded-[2.5rem] hover:bg-white dark:hover:bg-slate-900 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-black/40 group transition-all cursor-default"
            >
              <div className={`w-16 h-16 ${feature.color} rounded-[1.25rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4 transition-colors">{feature.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-light transition-colors mb-8">
                {feature.description}
              </p>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                <span>Learn more</span>
                <div className="w-0 group-hover:w-4 h-px bg-current transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
