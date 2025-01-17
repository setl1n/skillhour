import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// import { useTheme } from '../contexts/ThemeContext';
// import { Sun, Moon } from 'lucide-react';

const Header = () => {
  // const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'SkillsHub' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-theme">
      {/* Glass effect background */}
      <div className="absolute inset-0 bg-surface/90 backdrop-blur-md border-b border-primary/20 shadow-soft" />
      
      <nav className="container mx-auto px-8 h-16 relative">
        <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
          {/* Navigation Links */}
          <div className="flex items-center justify-center space-x-12">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="relative group py-1"
              >
                <span className={`text-sm font-medium tracking-wide transition-colors
                  ${location.pathname === path ? 'text-accent' : 'text-text hover:text-accent'}`}
                >
                  {label}
                </span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                {location.pathname === path && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

