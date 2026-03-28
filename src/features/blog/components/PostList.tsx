import { usePosts } from '@/hooks/usePost';
import { Loading } from '@/components/ui';
import PostItem from './PostItem';

const PostList = () => {
  const { data: posts, isLoading, isError } = usePosts();

  // TODO: 게시물 스켈레톤 스크린 추가
  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;

  // TODO: 게시물이 없을 때 에러 처리
  if (!posts || posts.length == 0) {
    console.log('게시물이 없습니다.');
  }
  // TODO: 무한 스크롤 구현

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts?.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
