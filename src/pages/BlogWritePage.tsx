import BlogForm from '@/features/blog/components/BlogForm';
import { useCreatePost } from '@/hooks/usePost';

const BlogWritePage = () => {
  const { mutate, isPending } = useCreatePost();

  return <BlogForm onSubmit={mutate} isLoading={isPending} />;
};

export default BlogWritePage;
