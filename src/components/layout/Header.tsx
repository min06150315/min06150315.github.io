import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b borde-slate-200  bg-white/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* 로고 */}
        <Link to="/" className="flex items-center gap-x-2 group cursor-pointer">
          <div className="w-8 h-8 bg-blue-500 rounded-lg shadow-[0_0_15px_rgba(14,165,233,0.5)]"></div>
          <span className="text-xl font-bold tracking-tight text-black">
            MIN<span className="text-blue-500">LOG</span>
          </span>
        </Link>

        <nav className="flex items-center gap-x-8 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/Blog" className="hover:text-blue-500">
            Blog
          </Link>
          <Link
            to="/login"
            className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};
