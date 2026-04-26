import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-500 py-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-y-4 px-4">
        <p className="text-sm text-gray-400">
          © 2026 mindev. All rights reserved.
        </p>
        <address className="not-italic text-center md:text-right text-gray-500 text-xs leading-relaxed">
          <p>
            Powered by{' '}
            <span className="text-gray-400">
              <Link
                className="hover:text-primary"
                to="https://react.dev/"
                target="_blank"
              >
                React
              </Link>
              ,{' '}
              <Link
                className="hover:text-primary"
                to="https://supabase.com/"
                target="_blank"
              >
                Supabase
              </Link>
              ,{' '}
              <Link
                className="hover:text-primary"
                to="https://docs.github.com/pages"
                target="_blank"
              >
                GitHub Pages
              </Link>
            </span>
          </p>
          <p>
            Design by{' '}
            <span className="text-gray-400">
              <Link
                className="hover:text-primary"
                to="https://stitch.withgoogle.com/"
                target="_blank"
              >
                Google Stitch
              </Link>
            </span>
          </p>
        </address>
      </div>
    </footer>
  );
};

export default Footer;
