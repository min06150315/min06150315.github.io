import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // 혹은 사용하시는 라우터
import { getPosts } from '@/api/posts.api'; // 이미 만들어진 API 함수 사용
import type { Post } from '@/types'; // 이미 정의된 타입 사용

const MainToast = () => {
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const posts = await getPosts();
        if (posts && posts.length > 0) {
          setLatestPost(posts[0]); // 첫 번째 요소가 가장 최신글

          const hideUntil = localStorage.getItem('hide-main-toast-until');
          const now = new Date().getTime();

          if (!hideUntil || now > parseInt(hideUntil)) {
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.error('최신 포스트 로드 실패:', error);
      }
    };

    fetchLatest();
  }, []);

  const handleCloseToday = () => {
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    localStorage.setItem(
      'hide-main-toast-until',
      tomorrow.getTime().toString(),
    );
    setIsVisible(false);
  };

  if (!latestPost) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed bottom-6 right-6 z-100 w-85 bg-surface/90 backdrop-blur-lg border border-hover-black rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-4 flex gap-4">
            <div className="shrink-0 w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
              <Bell size={24} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">
                  New Post
                </span>
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  <X size={14} />
                </button>
              </div>

              <h4 className="text-sm font-bold text-on-surface mb-1 truncate">
                {latestPost.title}
              </h4>
              <p className="text-[11px] text-on-surface-variant mb-3 line-clamp-2 leading-relaxed">
                {latestPost.content.replace(/[#*`]/g, '').slice(0, 60)}...
              </p>

              <div className="flex items-center gap-3">
                <Link
                  to={`/posts/${latestPost.id}`}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline underline-offset-4"
                  onClick={() => setIsVisible(false)}
                >
                  읽으러 가기 <ArrowRight size={14} />
                </Link>
                <button
                  onClick={handleCloseToday}
                  className="text-[10px] text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  오늘 그만 보기
                </button>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 10, ease: 'linear' }}
            onAnimationComplete={() => setIsVisible(false)}
            className="h-1 bg-primary/20"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MainToast;
