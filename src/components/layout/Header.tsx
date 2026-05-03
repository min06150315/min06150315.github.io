import { NavLink } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun } from 'lucide-react';
import SearchButton from '../ui/button/SearchButton';

interface NavbarProps {
  onSearchOpen: () => void;
}

const Header = ({ onSearchOpen }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 active:scale-95 ${
      isActive
        ? 'text-primary font-bold'
        : 'text-neutral-400 hover:text-primary'
    }`;

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-xl shadow-blue-500/5">
      <nav className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
        <div className="text-xl font-extrabold tracking-tighter text-neutral-100 font-headline">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/favicon-32x32.png" alt="logo" className="w-7 h-7" />
            MIN.DEV
          </NavLink>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-['Manrope'] font-semibold tracking-wide uppercase text-xs">
          <li>
            <NavLink className={navLinkStyle} to="/">
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkStyle} to="/blog">
              BLOG
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkStyle} to="/about">
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink className={navLinkStyle} to="/contact">
              CONTACT
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4 text-neutral-400">
          <SearchButton onSearchOpen={onSearchOpen} />
          <button
            onClick={toggleTheme}
            className="hover:text-blue-400 transition-all duration-300 active:scale-95"
          >
            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
