import { motion } from "framer-motion";
import { FileText, Sparkles, BarChart3 } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Smart Parsing",
    description: "Upload your resume and our AI extracts every detail — skills, experience, education.",
  },
  {
    icon: Sparkles,
    title: "NLP Analysis",
    description: "Advanced natural language processing scores your resume and identifies improvements.",
  },
  {
    icon: BarChart3,
    title: "ATS Scoring",
    description: "See how your resume performs against Applicant Tracking Systems used by top companies.",
  },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] gradient-hero overflow-hidden flex items-center">
      {/* Decorative circles */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-sky/10 blur-3xl" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-sky-light/5 blur-3xl" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/15 border border-sky/20 text-sky-light text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            AI-Powered Resume Intelligence
          </motion.div>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6">
            Analyze Your Resume{" "}
            <span className="text-sky-light">With AI</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-12">
            Upload your resume and get instant, detailed feedback powered by advanced NLP. 
            Improve your chances of landing your dream job.
          </p>

          <motion.a
            href="#upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-accent text-accent-foreground font-semibold text-lg shadow-glow hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <FileText className="w-5 h-5" />
            Analyze My Resume
          </motion.a>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
              className="glass rounded-2xl p-6 text-center group hover:shadow-card-hover transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-primary-foreground/60">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
