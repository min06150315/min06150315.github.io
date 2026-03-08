import BlogForm from '@/features/blog/components/BlogForm';
import { useCreatePost } from '@/hooks/queries/usePost';

const BlogWrite = () => {
  const { mutate, isPending } = useCreatePost();

  return <BlogForm onSubmit={mutate} isLoading={isPending} />;
};

export default BlogWrite;
