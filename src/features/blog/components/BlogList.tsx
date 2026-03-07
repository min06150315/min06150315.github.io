import { usePosts } from '@/hooks/queries/usePosts';

const BlogList = () => {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) return <div>로딩</div>;
  if (isError) return <div>에러</div>;

  return (
    <div>
      {posts?.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
