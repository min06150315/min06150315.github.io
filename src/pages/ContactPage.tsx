import { motion } from 'framer-motion';
import { SOCIAL_LINKS } from '@/constants/links';

const ContactPage = () => {
  return (
    <div className="w-full flex justify-center px-6 pt-32 md:pt-48 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-container">
            Contact
          </span>{' '}
          Me.
        </h1>
        <p className="text-gray-400 mb-12 leading-relaxed">
          방문해 주셔서 감사합니다.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-16">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-surface-low/40 border border-outline-variant transition-all hover:bg-outline-variant hover:border-primary/50 group"
            >
              <social.icon />
              <span className="text-[14px] font-medium text-gray-500 group-hover:text-gray-300">
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
