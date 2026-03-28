import { Loading } from '@/components/ui';
import PostForm from '@/features/blog/components/PostForm';
import { usePostDetail, useUpdatePost } from '@/hooks/usePost';
import { useParams } from 'react-router-dom';

const BlogEditPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: post, isLoading: isFetching } = usePostDetail(id!);

  const { mutate, isPending: isUpdating } = useUpdatePost(id!);

  if (isFetching) return <Loading />;

  return (
    <div>
      <PostForm initialData={post} onSubmit={mutate} isLoading={isUpdating} />
    </div>
  );
};

export default BlogEditPage;
