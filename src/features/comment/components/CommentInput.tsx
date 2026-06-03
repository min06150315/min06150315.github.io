import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateComment } from '@/hooks/useComment';
import { useAuth } from '@/hooks/useAuth';
import NavButton from '@/components/ui/button/NavButton';
import { signInWithGithub } from '@/api/auth';
import { Github } from 'lucide-react';

const commentSchema = z.object({
  content: z
    .string()
    .min(1, '내용을 입력해주세요.')
    .max(1000, '댓글은 1000자 이내로 작성 가능합니다.')
    .refine((val) => val.trim().length > 0, {
      message: '공백만으로는 댓글을 작성할 수 없습니다.',
    }),
});

type CommentFormData = z.infer<typeof commentSchema>;

const CommentInput = ({ postId }: { postId: number }) => {
  const { user, isLoading: authLoading } = useAuth();
  const { mutate: createComment, isPending: isSubmitting } =
    useCreateComment(postId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: { content: '' },
  });

  const onInternalSubmit = (data: CommentFormData) => {
    createComment(data.content, {
      onSuccess: () => reset(),
    });
  };

  if (authLoading)
    return (
      <div className="h-24 animate-pulse bg-surface-low rounded-xl mb-10" />
    );

  if (!user) {
    return (
      <div className="p-5 md:p-8 bg-surface-low border border-hover-black rounded-xl text-center mb-6 md:mb-10">
        <p className="text-slate-500 text-xs md:text-sm mb-3 md:mb-4">
          로그인하고 의견을 남겨보세요!
        </p>
        <button
          onClick={signInWithGithub}
          className="flex items-center justify-center gap-2 w-full py-2.5 md:py-3 px-4 bg-github hover:bg-github/90 text-on-surface text-xs md:text-sm rounded-xl transition-all font-medium border border-hover-black active:scale-[0.98]"
        >
          <Github className="w-4 h-4 md:w-5 md:h-5" />
          <span>GitHub으로 시작하기</span>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onInternalSubmit)}
      className="mb-6 md:mb-10 space-y-2.5 md:space-y-3"
    >
      <div className="relative">
        <textarea
          {...register('content')}
          placeholder={`${user.user_metadata.full_name || '닉네임'}님, 댓글을 남겨주세요...`}
          className="w-full h-24 md:h-28 p-3 md:p-4 bg-input-dark border border-hover-black rounded-xl text-on-surface text-base outline-none focus:border-outline focus:bg-surface-container transition-all resize-none placeholder:text-on-surface-variant/70"
        />
        {errors.content && (
          <p className="text-error text-[11px] mt-0.5 ml-1">
            {errors.content.message}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <NavButton
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className="px-5 md:px-6 py-1.5 md:py-2 rounded-full disabled:opacity-50 text-xs md:text-sm font-medium"
        >
          {isSubmitting ? '등록 중...' : '댓글 작성'}
        </NavButton>
      </div>
    </form>
  );
};

export default CommentInput;
