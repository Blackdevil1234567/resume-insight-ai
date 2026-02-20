import { FileText, Github, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="py-12 bg-primary text-primary-foreground">
    <div className="container mx-auto px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
          <FileText className="w-4 h-4 text-sky-light" />
        </div>
        <span className="font-display text-lg font-bold">ResumeAI</span>
      </div>
      <p className="text-primary-foreground/60 text-sm max-w-md mx-auto mb-6">
        AI-powered resume analysis to help you land your dream job. Get actionable insights in seconds.
      </p>
      <div className="border-t border-primary-foreground/10 pt-6">
        <p className="text-primary-foreground/40 text-xs">
          © {new Date().getFullYear()} ResumeAI. Built with AI.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
