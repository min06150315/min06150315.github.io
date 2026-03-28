import { useEffect, useState } from 'react';
import { usePosts } from '@/hooks/usePost';
import PostCard from './PostCard';
import PostSkeleton from '@/components/ui/skeleton/PostSkeleton';

const PostList = () => {
  const { data: posts, isLoading: isDataLoading } = usePosts();
  const [isTimerLoading, setIsTimerLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimerLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const showSkeleton = isDataLoading || isTimerLoading;

  if (showSkeleton) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );
  }

  // TODO: 게시물이 없을 때 에러 처리
  if (!posts || posts.length == 0) {
    console.log('게시물이 없습니다.');
  }
  // TODO: 무한 스크롤 구현 (Intersection Observer 사용)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
