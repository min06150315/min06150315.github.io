import { Link } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Search } from 'lucide-react';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 w-full z-50 bg-[#131313]/80 backdrop-blur-md border-b border-white/10 shadow-xl shadow-blue-500/5">
      <nav className="flex justify-between items-center px-8 h-20 max-w-7xl mx-auto">
        <div className="text-xl font-extrabold tracking-tighter text-neutral-100 font-headline">
          <Link to="/">MIN.DEV</Link>
        </div>

        <ul className="hidden md:flex items-center gap-8 font-['Manrope'] font-semibold tracking-wide uppercase text-xs">
          <li>
            <Link
              className="text-neutral-400 hover:text-blue-500 transition-all duration-300 active:scale-95"
              to="/"
            >
              HOME
            </Link>
          </li>
          <li>
            <Link
              className="text-neutral-400 hover:text-blue-500 transition-all duration-300 active:scale-95"
              to="/blog"
            >
              BLOG
            </Link>
          </li>
          <li>
            <Link
              className="text-neutral-400 hover:text-blue-500 transition-all duration-300 active:scale-95"
              to="/about"
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              className="text-neutral-400 hover:text-blue-500 transition-all duration-300 active:scale-95"
              to="/contact"
            >
              CONTACT
            </Link>
          </li>
        </ul>

        {/* Trailing Actions: 우측 버튼 레이아웃 및 트랜지션 적용 */}
        <div className="flex items-center gap-4 text-neutral-400">
          <button className="hover:text-blue-400 transition-all duration-300">
            <Search size={24} /> {/* Stitch의 material-icon 크기(24px) 반영 */}
          </button>
          <button
            onClick={toggleTheme}
            className="hover:text-blue-400 transition-all duration-300 active:scale-95"
          >
            {/* 테마에 따라 아이콘만 교체, 스타일은 Stitch 버튼 스타일 유지 */}
            {theme === 'dark' ? <Moon size={24} /> : <Sun size={24} />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
