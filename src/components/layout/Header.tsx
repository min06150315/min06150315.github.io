import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md">
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* 로고 */}
        <Link
          to="/"
          className="flex items-center gap-x-2 group cursor-pointer px-3 py-2 -ml-3 rounded-md hover:bg-hover-black transition-colors"
        >
          <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
          <span className="text-xl font-bold tracking-tight text-slate-300">
            MIN<span className="text-blue-500">LOG</span>
          </span>
        </Link>

        <nav className="flex items-center gap-x-4 text-sm font-medium">
          <Link
            to="/blog"
            className="px-3 py-2 rounded-md hover:bg-hover-black transition-colors"
          >
            Blog
          </Link>
          <Link
            to="/about"
            className="px-3 py-2 rounded-md hover:bg-hover-black transition-colors"
          >
            About
          </Link>
          <Link
            to="/search"
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all"
          >
            Search
          </Link>
          <div className="cursor-pointer px-2 py-2 rounded-md hover:bg-hover-black transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="yellow"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </div>
        </nav>
      </div>
    </header>
  );
};
