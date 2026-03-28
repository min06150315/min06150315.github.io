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

  return <PostForm onSubmit={handleSubmit} isLoading={isPending} />;
};

export default BlogWritePage;
