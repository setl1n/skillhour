import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useTypedDispatch } from '../hooks/useTypedDispatch';
import { RootState } from '../store/store';
import { logoutAsync } from '../store/auth/authSlice';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useTypedDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md 
                  transition-colors duration-200 hover:bg-red-600 focus:outline-none focus:ring-2 
                  focus:ring-red-500 focus:ring-offset-2"
              >
                Logout
              </button>
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

