import { motion } from "framer-motion";
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Code2,
  Heart,
  Globe,
  Briefcase,
  Target,
  TrendingUp,
} from "lucide-react";

export interface AnalysisData {
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  skills: {
    technical: string[];
    soft: string[];
    languages: string[];
  };
  experience: {
    yearsEstimate: string;
    level: string;
    industries: string[];
  };
  suggestions: { category: string; text: string }[];
  atsScore: number;
  keywordDensity: {
    topKeywords: { word: string; count: number }[];
  };
}

interface AnalysisResultsProps {
  data: AnalysisData;
}

const ScoreRing = ({ score, label, size = 120 }: { score: number; label: string; size?: number }) => {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 70 ? "hsl(150, 70%, 45%)" : score >= 40 ? "hsl(40, 90%, 55%)" : "hsl(0, 70%, 55%)";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-2xl font-bold text-foreground">{score}</span>
        </div>
      </div>
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
    </div>
  );
};

const SectionCard = ({
  title,
  icon: Icon,
  children,
  delay = 0,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="rounded-2xl shadow-card bg-card p-6"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
        <Icon className="w-5 h-5 text-accent-foreground" />
      </div>
      <h3 className="font-display text-lg font-semibold text-foreground">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const SkillBadge = ({ skill }: { skill: string }) => (
  <span className="inline-block px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
    {skill}
  </span>
);

const AnalysisResults = ({ data }: AnalysisResultsProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Analysis Results
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">{data.summary}</p>
        </motion.div>

        {/* Score section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-12 mb-12 flex-wrap"
        >
          <ScoreRing score={data.overallScore} label="Overall Score" size={140} />
          <ScoreRing score={data.atsScore} label="ATS Score" size={140} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Strengths */}
          <SectionCard title="Strengths" icon={CheckCircle2} delay={0.2}>
            <ul className="space-y-2">
              {data.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  {s}
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Weaknesses */}
          <SectionCard title="Areas to Improve" icon={AlertTriangle} delay={0.3}>
            <ul className="space-y-2">
              {data.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 shrink-0" />
                  {w}
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Skills */}
          <SectionCard title="Technical Skills" icon={Code2} delay={0.4}>
            <div className="flex flex-wrap gap-2">
              {data.skills.technical.map((s) => (
                <SkillBadge key={s} skill={s} />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Soft Skills" icon={Heart} delay={0.45}>
            <div className="flex flex-wrap gap-2">
              {data.skills.soft.map((s) => (
                <SkillBadge key={s} skill={s} />
              ))}
            </div>
          </SectionCard>

          {/* Languages */}
          {data.skills.languages.length > 0 && (
            <SectionCard title="Languages" icon={Globe} delay={0.5}>
              <div className="flex flex-wrap gap-2">
                {data.skills.languages.map((l) => (
                  <SkillBadge key={l} skill={l} />
                ))}
              </div>
            </SectionCard>
          )}

          {/* Experience */}
          <SectionCard title="Experience Profile" icon={Briefcase} delay={0.55}>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Experience</span>
                <span className="font-medium text-foreground">{data.experience.yearsEstimate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Career Level</span>
                <span className="font-medium text-foreground">{data.experience.level}</span>
              </div>
              <div>
                <span className="text-muted-foreground block mb-2">Industries</span>
                <div className="flex flex-wrap gap-2">
                  {data.experience.industries.map((ind) => (
                    <SkillBadge key={ind} skill={ind} />
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Top Keywords */}
          <SectionCard title="Top Keywords" icon={Target} delay={0.6}>
            <div className="space-y-2">
              {data.keywordDensity.topKeywords.slice(0, 8).map((kw) => (
                <div key={kw.word} className="flex items-center justify-between text-sm">
                  <span className="text-foreground">{kw.word}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full gradient-accent"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${Math.min((kw.count / (data.keywordDensity.topKeywords[0]?.count || 1)) * 100, 100)}%`,
                        }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-muted-foreground w-6 text-right">{kw.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Suggestions */}
          <SectionCard title="Suggestions" icon={Lightbulb} delay={0.65}>
            <ul className="space-y-3">
              {data.suggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-foreground">{s.category}: </span>
                    <span className="text-muted-foreground">{s.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </SectionCard>
        </div>
      </div>
    </section>
  );
};

export default AnalysisResults;
