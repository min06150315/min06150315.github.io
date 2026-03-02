import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-slate-200 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
          <p className="text-sm font-bold text-slate-900">
            © 2026 MINBIN. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-900">
            <Link to="/github">GitHub</Link>
            <Link to="/discord">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
