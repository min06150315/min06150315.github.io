import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Menu, X } from 'lucide-react';
import SearchButton from '../ui/button/SearchButton';

interface NavbarProps {
  onSearchOpen: () => void;
}

const Header = ({ onSearchOpen }: NavbarProps) => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 데스크탑용 헤더 스타일
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 active:scale-95 ${
      isActive
        ? 'text-primary font-bold'
        : 'text-on-surface-more hover:text-primary'
    }`;

  // 모바일 헤더 스타일
  const mobileLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `block py-5 px-8 text-sm font-bold border-b-1 border-border-muted tracking-widest transition-all duration-300 ${
      isActive
        ? 'bg-surface-main text-primary'
        : 'bg-surface hover:bg-surface-main text-on-surface-more hover:text-primary'
    }`;

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'BLOG', path: '/blog' },
    { name: 'ABOUT', path: '/about' },
    { name: 'CONTACT', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 w-full z-50 bg-surface/80 backdrop-blur-md border-b border-white/10 shadow-xl shadow-blue-500/5">
      <nav className="flex justify-between items-center px-6 md:px-8 h-20 max-w-7xl mx-auto">
        <div className="text-xl font-extrabold tracking-tighter text-on-title font-headline z-60">
          <NavLink to="/" className="flex items-center gap-2">
            <img src="/favicon-32x32.png" alt="logo" className="w-7 h-7" />
            <span className="block">MIN.DEV</span>
          </NavLink>
        </div>

        {/* 데스크탑 메뉴 링크 */}
        <ul className="hidden md:flex items-center gap-8 font-['Manrope'] font-semibold tracking-wide uppercase text-xs">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink className={navLinkStyle} to={item.path}>
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 검색 및 테마 토글 버튼 */}
        <div className="flex items-center gap-2 md:gap-4 text-on-surface-more z-60">
          <SearchButton onSearchOpen={onSearchOpen} />
          <button
            onClick={toggleTheme}
            className="hover:text-primary transition-all duration-300 active:scale-95 p-2"
          >
            {theme === 'dark' ? <Moon size={22} /> : <Sun size={22} />}
          </button>

          {/* 모바일용 햄버거 메뉴 토글 */}
          <button
            onClick={toggleMenu}
            className="md:hidden hover:text-primary transition-all duration-300 p-2"
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* 모바일용 헤더 */}
        <div
          className={`
          fixed inset-0 bg-surface/90 opacity-100 backdrop-blur-lg transition-all duration-500 md:hidden z-50
          ${isMenuOpen ? 'translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}
        `}
        >
          <div className="flex flex-col pt-20 h-full uppercase tracking-tighter font-['Manrope']">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={mobileLinkStyle}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
