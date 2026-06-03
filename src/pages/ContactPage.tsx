import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/constants/links';

const ContactPage = () => {
  return (
    <div className="w-full flex justify-center px-4 pt-24 md:pt-48 pb-12 md:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 md:mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-container">
            Contact
          </span>{' '}
          Me.
        </h1>
        <p className="text-gray-400 mb-8 md:mb-12 text-sm md:text-base leading-relaxed">
          방문해 주셔서 감사합니다.
        </p>

        <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-5 gap-3 md:gap-4 mb-12 md:mb-16">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-low/40 border border-outline-variant transition-all hover:bg-outline-variant hover:border-primary/50 group w-[calc(50%-6px)] sm:w-auto"
            >
              <div className="text-xl md:text-2xl shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                <social.icon />
              </div>
              <span className="text-xs md:text-[14px] font-medium text-gray-500 group-hover:text-gray-300">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
