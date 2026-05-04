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
      className="group flex items-center gap-3 px-3 py-1.5 w-full max-w-40
             bg-surface-low/50 hover:bg-surface-high border border-outline-variant 
             hover:border-primary/50 rounded-xl transition-all duration-300"
      aria-label="Search posts"
    >
      <Search
        size={16}
        className="text-on-surface-variant group-hover:text-primary transition-colors"
      />

      <span className="text-sm text-on-surface-variant group-hover:text-on-surface flex-1 text-left">
        Search
      </span>

      <div className="flex items-center gap-1">
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
