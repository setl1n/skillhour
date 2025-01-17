import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { RootState } from '../store/store';
import { logoutAsync } from '../store/auth/authSlice';
import { FaHourglassHalf } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const navLinks = [
    { path: '/', label: 'SkillsHub' },
  ];

  const handleLogout = () => {
    dispatch(logoutAsync());
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-theme">
      <div className="absolute inset-0 bg-surface/90 backdrop-blur-md border-b border-primary/20 shadow-soft" />
      
      <nav className="container mx-auto px-8 h-16 relative">
        <div className="flex items-center justify-between h-full max-w-6xl mx-auto">
          {/* Left side navigation */}
          <div className="flex items-center space-x-12">
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

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {isAuthenticated && user && (
              <>
                <div 
                  className="relative flex items-center space-x-2"
                  onMouseEnter={() => setTooltipVisible(true)}
                  onMouseLeave={() => setTooltipVisible(false)}
                >
                  <FaHourglassHalf className="text-accent" />
                  <span className="text-sm font-medium">{user.timeCred} TimeCreds</span>
                  {isTooltipVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 px-2 py-1 text-xs text-white bg-black rounded"
                    >
                      Time Creds, your remaining currency
                    </motion.div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md 
                    transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 
                    focus:ring-red-500 focus:ring-offset-2"
                >
                  Logout
                </button>
              </>
            )}
            <Link
              to="/profile"
              className="relative group py-1"
            >
              <span className={`text-sm font-medium tracking-wide transition-colors
                ${location.pathname === '/profile' ? 'text-accent' : 'text-text hover:text-accent'}`}
              >
                My Profile
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              {location.pathname === '/profile' && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent/10"
                />
              )}
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

