import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ResumeUpload from "@/components/ResumeUpload";
import AnalysisResults, { type AnalysisData } from "@/components/AnalysisResults";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const handleAnalyze = async (resumeText: string) => {
    if (!resumeText.trim()) {
      toast.error("Please enter or upload your resume text.");
      return;
    }

    setIsLoading(true);
    setAnalysisData(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText },
      });

      if (error) throw error;

      if (data?.error) {
        toast.error(data.error);
        return;
      }

      setAnalysisData(data);
      toast.success("Resume analyzed successfully!");

      // Scroll to results
      setTimeout(() => {
        document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err: any) {
      console.error("Analysis error:", err);
      toast.error(err.message || "Failed to analyze resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ResumeUpload onAnalyze={handleAnalyze} isLoading={isLoading} />
      {analysisData && (
        <div id="results">
          <AnalysisResults data={analysisData} />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Index;
