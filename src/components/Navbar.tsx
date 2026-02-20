import { FileText } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass">
    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
          <FileText className="w-4 h-4 text-accent-foreground" />
        </div>
        <span className="font-display text-lg font-bold text-foreground">ResumeAI</span>
      </div>
      <a
        href="#upload"
        className="px-5 py-2 rounded-lg gradient-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        Get Started
      </a>
    </div>
  </nav>
);

export default Navbar;
