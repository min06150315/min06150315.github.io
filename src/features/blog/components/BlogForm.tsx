import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Post } from '@/types';
import { useEffect } from 'react';

const blogSchema = z.object({
  title: z.string().min(2, '제목은 최소 2글자 이상이어야 합니다.').max(50),
  content: z.string().min(5, '내용은 최소 5글자 이상 적어주세요.'),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogFormProps {
  initialData?: Post | null;
  onSubmit: (data: BlogFormData) => void;
  isLoading: boolean;
}

const BlogForm = ({ initialData, onSubmit, isLoading }: BlogFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title,
        content: initialData.content,
      });
    }
  }, [initialData, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-3xl mx-auto"
    >
      <div>
        <input
          {...register('title')}
          type="text"
          placeholder="제목을 입력하세요"
          className="w-full bg-transparent text-4xl font-bold border-none outline-none text-slate-100 placeholder:text-slate-600 "
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-2">{errors.title.message}</p>
        )}
      </div>

      <div className="h-[1px] bg-slate-900" />

      <div>
        <textarea
          {...register('content')}
          placeholder="내용을 입력하세요..."
          className="w-full h-[500px] bg-transparent text-lg border-none outline-none text-slate-300 resize-none"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-x-3">
        <button
          type="submit"
          disabled={isLoading}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all disabled:opacity-50"
        >
          {isLoading ? '저장 중...' : initialData ? '수정하기' : '출간하기'}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
