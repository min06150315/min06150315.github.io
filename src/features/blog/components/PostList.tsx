import { useEffect, useState } from 'react';
import { usePosts } from '@/hooks/usePost';
import PostCard from './PostCard';
import PostSkeleton from '@/components/ui/skeleton/PostSkeleton';
import { useViewStore } from '@/store/useViewStore';

const PostList = () => {
  const { data: posts, isLoading: isDataLoading } = usePosts();
  const [isTimerLoading, setIsTimerLoading] = useState(true);
  const { viewMode } = useViewStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimerLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = isDataLoading || isTimerLoading;

  if (showSkeleton) {
    return (
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          : 'flex flex-col gap-4'
      }>
        {Array.from({ length: 6 }).map((_, index) => (
          <PostSkeleton key={index} viewMode={viewMode} />
        ))}
      </div>
    );
  }

  if (!posts || posts.length == 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-on-surface-variant/70">
        <p className="text-base md:text-lg font-medium">아직 작성된 게시물이 없습니다.</p>
      </div>
    );
  }
  // TODO: 무한 스크롤 구현 (Intersection Observer 사용)

  return (
    <div
      className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          : 'flex flex-col gap-4'
      }
    >
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} viewMode={viewMode} />
      ))}
    </div>
  );
};

export default PostList;
