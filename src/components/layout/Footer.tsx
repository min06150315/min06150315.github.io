import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-slate-200 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
          <p className="text-sm text-slate-500">
            © 2026 MyLog. All rights reserved.
          </p>
          <div className="flex gap-x-6 text-sm font-medium text-slate-600">
            <Link to="/github">GitHub</Link>
            <Link to="/discord">Discord</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
