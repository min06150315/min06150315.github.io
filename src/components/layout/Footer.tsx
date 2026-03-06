import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-500 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
          <p className="text-sm font-bold">
            © 2026 minbin blog. Powerd by React, Supabase, Github Pages.
          </p>
          <div className="flex gap-6 text-sm font-medium">
            <Link to="/github">GitHub</Link>
            <Link to="/discord">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
