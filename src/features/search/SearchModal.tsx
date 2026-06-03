import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPosts } from '@/api/posts.api';
import type { Post } from '@/types';
import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';

const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // 디바운스 최적화 로직 유지
  useEffect(() => {
    if (query.trim().length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      try {
        const data = await searchPosts(query);
        setResults(data || []);
        setSelectedIndex(0);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleNavigate = (id: string | number | undefined) => {
    if (id === undefined) return;
    navigate(`/blog/${id}`);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleNavigate(String(results[selectedIndex].id));
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <AnimatePresence
      onExitComplete={() => {
        setQuery('');
        setResults([]);
        setSelectedIndex(0);
      }}
    >
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-surface/60 backdrop-blur-sm z-999"
          />

          {/* 메인 모달 창 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onKeyDown={handleKeyDown}
            className="fixed w-[calc(100%-32px)] md:w-full max-w-xl left-1/2 -translate-x-1/2 
                       top-[10%] md:top-[20%] bg-surface-container-low border border-outline-variant 
                       rounded-2xl shadow-2xl z-1000 overflow-hidden"
          >
            <div className="flex items-center px-4 md:px-6 py-4 border-b border-outline-variant">
              <Search className="text-primary mr-3 md:mr-4 shrink-0" size={20} />
              <input
                autoFocus
                placeholder="포스트를 검색하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-on-surface outline-none text-base md:text-lg min-w-0"
              />
              <div className="flex items-center justify-center w-5 h-5 shrink-0">
                {isLoading ? (
                  <LoadingSpinner size={18} />
                ) : (
                  <button
                    onClick={onClose}
                    className="text-on-surface-variant hover:text-on-surface p-1 active:scale-90 transition-transform"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-80 md:max-h-100 overflow-y-auto p-2">
              {!isLoading && results.length > 0 ? (
                results.map((post, index) => (
                  <div
                    key={post.id}
                    onClick={() => handleNavigate(String(post.id))}
                    className={`flex items-center px-4 py-3 rounded-xl cursor-pointer transition-colors group
                      ${index === selectedIndex ? 'bg-primary/10' : 'hover:bg-on-surface/5'}
                    `}
                  >
                    <FileText
                      className="text-gray-500 group-hover:text-primary mr-3 shrink-0"
                      size={18}
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="text-on-surface font-medium text-sm md:text-base truncate">
                        {post.title}
                      </h4>
                      <p className="text-on-surface-variant text-xs truncate">
                        {post.category}
                      </p>
                    </div>
                  </div>
                ))
              ) : !isLoading && query ? (
                <div className="py-10 text-center text-on-surface-variant text-sm">
                  No results found.
                </div>
              ) : (
                !isLoading && (
                  <div className="py-4 px-4 text-on-surface-variant text-xs uppercase tracking-widest font-bold">
                    Recent Searches
                  </div>
                )
              )}
            </div>

            <div className="px-4 md:px-6 py-3 bg-surface-container-high/50 border-t border-outline-variant flex justify-between text-xs text-on-surface-variant">
              <div className="flex items-center gap-2">
                <kbd className="bg-surface-container-high px-1.5 py-0.5 rounded border border-outline-variant text-[10px]">
                  Enter
                </kbd>
                <span>눌러 이동</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;