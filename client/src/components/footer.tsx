import * as React from "react";
import { Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
          <span>© {currentYear} Yara Rule Generator</span>
          <span>•</span>
          <span className="flex items-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" fill="currentColor" /> for the cybersecurity community
          </span>
        </div>
      </div>
    </footer>
  );
}