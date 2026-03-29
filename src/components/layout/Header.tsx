import { Link } from 'react-router-dom';
import { NavButton } from '@/components/ui';
// import { useTheme } from '@/hooks/useTheme';
// import { IconLogo, Moon, Sun } from '../ui/icons/NavIcons';
import { IconLogo, Moon } from '@/components/ui/icons/NavIcons';
import { Search } from 'lucide-react';
import { signOut } from '@/api/auth';

const Header = () => {
  // const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-x-2 group cursor-pointer px-3 py-2 -ml-3 rounded-md hover:bg-hover-black transition-colors"
        >
          <IconLogo />
        </Link>

        <nav className="flex items-center gap-x-2 text-sm font-medium">
          <NavButton to="/blog">Blog</NavButton>
          <NavButton to="/about">About</NavButton>
          <NavButton to="/serach">
            <Search size={20} strokeWidth={2} className="cursor-pointer" />
          </NavButton>
          {/* <NavButton onClick={toggleTheme} className="pl-2 pr-2">
            {theme === 'dark' ? <Moon /> : <Sun />}
          </NavButton> */}
          <NavButton onClick={signOut} className="pl-2 pr-2">
            <Moon />
          </NavButton>
        </nav>
      </div>
    </header>
  );
};

export default Header;
