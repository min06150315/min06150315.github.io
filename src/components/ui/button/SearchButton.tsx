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
                 bg-gray-900/50 hover:bg-gray-800 border border-gray-800 
                 hover:border-sky-500/50 rounded-xl transition-all duration-300"
      aria-label="Search posts"
    >
      {/* 왼쪽: 돋보기 아이콘 */}
      <Search
        size={16}
        className="text-gray-500 group-hover:text-sky-400 transition-colors"
      />

      {/* 중앙: Search 텍스트 */}
      <span className="text-sm text-gray-400 flex-1 text-left">Search</span>

      {/* 오른쪽: 단축키 가이드 */}
      <div className="flex items-center gap-1">
        <kbd
          className="bg-gray-800 text-gray-500 text-[10px] 
                        font-mono px-1.5 py-0.5 rounded border border-gray-700
                        group-hover:border-sky-800 transition-colors"
        >
          {isMac ? '⌘' : 'Ctrl'}
        </kbd>
        <kbd
          className="bg-gray-800 text-gray-500 text-[10px] 
                        font-mono px-1.5 py-0.5 rounded border border-gray-700
                        group-hover:border-sky-800 transition-colors"
        >
          K
        </kbd>
      </div>
    </button>
  );
};

export default SearchButton;
