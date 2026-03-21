import { SOCIAL_LINKS } from '@/constants/links';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-500 py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-y-4">
          <p className="text-sm font-bold">
            © 2026 minbin blog. Powerd by React, Supabase, Github Pages.
          </p>

          <div className="flex gap-6">
            {SOCIAL_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.link}
                title={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-base-gray"
              >
                <link.icon />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
