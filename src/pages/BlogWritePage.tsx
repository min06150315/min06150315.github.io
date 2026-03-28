import PostForm from '@/features/blog/components/PostForm';
import { useCreatePost } from '@/hooks/usePost';

const BlogWritePage = () => {
  const { mutate, isPending } = useCreatePost();

  return <PostForm onSubmit={mutate} isLoading={isPending} />;
};

export default BlogWritePage;
