import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import PostForm, {
  type PostFormData,
} from '@/features/blog/components/PostForm';
import { usePostDetail, useUpdatePost } from '@/hooks/usePost';
import { useParams } from 'react-router-dom';
import type { Post } from '@/types';
import { uploadImage } from '@/lib/supabase';

const BlogEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading: isFetching } = usePostDetail(id!);
  const { mutate, isPending: isUpdating } = useUpdatePost(id!);

  const handleSubmit = async (data: PostFormData, imageFile: File | null) => {
    try {
      let thumbnailUrl = post?.thumbnail_image;

      if (imageFile) {
        thumbnailUrl = await uploadImage(imageFile, 'thumbnails');
      }
      const updatedPost: Partial<Post> = {
        title: data.title,
        content: data.content,
        thumbnail_image: thumbnailUrl,
      };

      mutate(updatedPost as Post);
    } catch (error) {
      console.error('수정 중 에러:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  if (isFetching) return <LoadingSpinner />;
  if (!post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className="pb-6">
      <h1 className="text-3xl font-bold mb-8">게시물 수정</h1>
      <PostForm
        initialData={post}
        onSubmit={handleSubmit}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default BlogEditPage;
