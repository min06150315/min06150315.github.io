import { useComment } from '@/hooks/useComment';
import CommentItem from './CommentItem';
import { Loader2 } from 'lucide-react';
import CommentInput from './CommentInput';

interface CommentListProps {
  postId: number;
}

const CommentList = ({ postId }: CommentListProps) => {
  const { data: comments, isLoading, error } = useComment(postId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error text-sm py-5 text-center">
        댓글을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="mt-16 pt-10 border-t border-hover-black">
      <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
        댓글{' '}
        <span className="text-primary text-sm">{comments?.length || 0}</span>
      </h3>
      <div className="mb-12">
        <CommentInput postId={postId} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-slate-700" />
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentList;
