import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
    }
  }, [isDarkMode]);

  return (
    <header className="bg-[#10151c] border-b border-thin-separator px-8 py-4 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-primary-foreground rounded" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-primary tracking-wider">NOVOCAINE</h1>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-background border border-thin-separator p-2 rounded-lg hover:border-primary transition-all"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-light-mode-primary" />
          )}
        </motion.button>
      </div>
    </header>
  );
}
