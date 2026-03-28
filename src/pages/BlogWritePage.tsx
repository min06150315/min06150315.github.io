import PostForm, {
  type PostFormData,
} from '@/features/blog/components/PostForm';
import { useCreatePost } from '@/hooks/usePost';
import { uploadImage } from '@/lib/supabase';
import type { Post } from '@/types';

const BlogWritePage = () => {
  const { mutate, isPending } = useCreatePost();

  const handleSubmit = async (data: PostFormData, imageFile: File | null) => {
    try {
      let uploadedUrl: string | null = null;
      if (imageFile) {
        uploadedUrl = await uploadImage(imageFile);
      }

      const postPayload = {
        title: data.title,
        content: data.content,
        thumbnail_image: uploadedUrl,
      };

      mutate(postPayload as Post);
    } catch (error) {
      console.error('이미지 업로드 에러', error);
      alert('이미지 업로드 실패');
    }
  };

  return (
    <div className="pb-6">
      <h1 className="text-3xl font-bold mb-8">게시물 작성</h1>
      <PostForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
};

export default BlogWritePage;
