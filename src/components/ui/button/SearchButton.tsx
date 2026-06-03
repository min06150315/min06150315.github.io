import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchButtonProps {
  onSearchOpen: () => void;
}

const SearchButton = ({ onSearchOpen }: SearchButtonProps) => {
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0);
  }, []);

  return (
    <button
      onClick={onSearchOpen}
      className="group flex items-center justify-center md:justify-start gap-3 
                 p-2 md:px-3 md:py-1.5 w-auto md:w-full md:max-w-40
                 bg-transparent md:bg-surface-low/50 md:hover:bg-surface-high 
                 border border-transparent md:border-outline-variant hover:text-primary md:hover:border-primary/50 
                 rounded-xl transition-all duration-300 active:scale-95 md:active:scale-100"
      aria-label="Search posts"
    >
      <Search className="text-on-surface-more group-hover:text-primary transition-colors w-5.5 h-5.5 md:w-4 md:h-4" />

      <span className="hidden md:block text-sm text-on-surface-variant group-hover:text-on-surface flex-1 text-left">
        Search
      </span>

      <div className="hidden md:flex items-center gap-1">
        <kbd
          className="bg-surface-variant text-on-surface-variant text-[10px] 
                 font-mono px-1.5 py-0.5 rounded border border-outline-variant
                 group-hover:border-primary/30 transition-colors"
        >
          {isMac ? '⌘' : 'Ctrl'}
        </kbd>
        <kbd
          className="bg-surface-variant text-on-surface-variant text-[10px] 
                 font-mono px-1.5 py-0.5 rounded border border-outline-variant
                 group-hover:border-primary/30 transition-colors"
        >
          K
        </kbd>
      </div>
    </button>
  );
};

export default SearchButton;
