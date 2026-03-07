import { usePosts } from '@/hooks/queries/usePosts';
import { Loading } from '@/components/ui';
import BlogItem from './BlogItem';

const BlogList = () => {
  const { data: posts, isLoading, isError } = usePosts();

  // TODO: 게시물 스켈레톤 스크린 추가
  if (isLoading) return <Loading />;
  if (isError) return <div>에러</div>;

  // TODO: 게시물이 없을 때 에러 처리
  if (!posts || posts.length == 0) {
    console.log('게시물이 없습니다.');
  }

  return (
    <div className="space-y-6 mt-8">
      {posts?.map((post) => (
        <BlogItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
