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
  const navigate = useNavigate(); // 2. navigate 함수 선언
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const updateResults = async () => {
      if (query.trim().length > 0) {
        const data = await searchPosts(query);
        setResults(data || []);
        setSelectedIndex(0);
      } else {
        setResults([]);
      }
    };

    updateResults();

    if (query.trim().length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    // 2. 입력이 시작되면 로딩 시작
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

  // 2. 이동 로직 함수화
  const handleNavigate = (id: string | number | undefined) => {
    if (id === undefined) return;

    navigate(`/blog/${id}`);
    onClose();
  };

  // 3. 키보드 핸들러 추가
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
            className="fixed inset-0 bg-surface/60 backdrop-blur-sm z-100"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onKeyDown={handleKeyDown}
            className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-xl bg-surface-container-low border border-outline-variant rounded-2xl shadow-2xl z-101 overflow-hidden"
          >
            <div className="flex items-center px-6 py-4 border-b border-outline-variant">
              <Search className="text-primary mr-4" size={20} />
              <input
                autoFocus
                placeholder="포스트를 검색하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-on-surface outline-none text-lg"
              />
              <div className="flex items-center justify-center w-5 h-5">
                {isLoading ? (
                  <LoadingSpinner size={18} />
                ) : (
                  <button
                    onClick={onClose}
                    className="text-on-surface-variant hover:text-on-surface"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>

            <div className="max-h-100 overflow-y-auto p-2">
              {!isLoading && results.length > 0 ? (
                results.map((post, index) => (
                  <div
                    key={post.id}
                    onClick={() => handleNavigate(String(post.id))} // 클릭 시 이동
                    className={`flex items-center px-4 py-3 rounded-xl cursor-pointer transition-colors group
                      ${index === selectedIndex ? 'bg-primary/10' : 'hover:bg-on-surface/5'}
                    `}
                  >
                    <FileText
                      className="text-gray-500 group-hover:text-sky-400 mr-3"
                      size={18}
                    />
                    <div>
                      <h4 className="text-on-surface font-medium">
                        {post.title}
                      </h4>
                      <p className="text-on-surface-variant text-xs">
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

            <div className="px-6 py-3 bg-surface-container-high/50 border-t border-outline-variant flex justify-between text-xs text-on-surface-variant">
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
