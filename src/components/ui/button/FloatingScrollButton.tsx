import { ChevronUp } from 'lucide-react';

export const FloatingScrollButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-less-black border border-hover-black text-gray-500 hover:text-white hover:border-primary/70 transition-all shadow-primary hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.1 active:scale-90 active:translate-y-0 cursor-pointer"
      >
        <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300" />

        <ChevronUp
          size={24}
          className="relative z-10 transition-transform group-hover:-translate-y-0.1"
        />
      </button>
    </div>
  );
};
