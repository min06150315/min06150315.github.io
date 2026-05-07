import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';

const ContactSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-8 py-40 text-center">
      <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase mb-4 block opacity-80">
        contact
      </span>

      <h2 className="text-5xl md:text-7xl font-bold text-on-surface mb-16 tracking-tighter">
        Let's Connect.
      </h2>

      <Link
        to="/contact"
        className="group inline-flex items-center gap-4 text-on-surface-variant hover:text-primary transition-all duration-300"
      >
        <span className="text-xl md:text-2xl font-light tracking-widest uppercase">
          Send a Message
        </span>
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-outline flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-surface transition-all duration-500">
          <IoMdMail size={24} />
        </div>
      </Link>
    </section>
  );
};

export default ContactSection;
