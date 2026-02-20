import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResumeUploadProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const ResumeUpload = ({ onAnalyze, isLoading }: ResumeUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");

  const handleFile = useCallback(async (file: File) => {
    setFileName(file.name);
    const text = await file.text();
    setResumeText(text);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    setResumeText("");
    setFileName("");
  };

  return (
    <section id="upload" className="py-20 bg-background">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Upload Your Resume
          </h2>
          <p className="text-muted-foreground text-lg">
            Paste your resume text or upload a .txt file to get started
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl shadow-card bg-card p-8"
        >
          {/* Drop zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer mb-6 ${
              dragActive
                ? "border-accent bg-accent/5"
                : "border-border hover:border-accent/50"
            }`}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              accept=".txt,.text"
              onChange={handleChange}
              className="hidden"
            />
            <Upload className={`w-10 h-10 mx-auto mb-3 transition-colors ${dragActive ? "text-accent" : "text-muted-foreground"}`} />
            <p className="text-foreground font-medium">
              Drag & drop your resume file here
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse (.txt files)
            </p>
          </div>

          <AnimatePresence>
            {fileName && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary mb-4"
              >
                <FileText className="w-5 h-5 text-accent" />
                <span className="text-sm text-foreground flex-1 truncate">{fileName}</span>
                <button onClick={clearFile} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Or paste your resume text here..."
              className="w-full h-48 p-4 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none font-body text-sm transition-colors"
            />
          </div>

          <Button
            onClick={() => onAnalyze(resumeText)}
            disabled={!resumeText.trim() || isLoading}
            className="w-full mt-6 h-14 text-lg font-semibold rounded-xl gradient-accent text-accent-foreground border-0 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing with AI...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Analyze Resume
              </span>
            )}
          </Button>
        </motion.div>
      </div>
    </section>
  );
};


export default ResumeUpload;
