import { useComment } from '@/hooks/useComment';
import CommentItem from './CommentItem';
import { Loader2 } from 'lucide-react';

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
      <div className="text-red-400 text-sm py-5 text-center">
        댓글을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
        댓글{' '}
        <span className="text-primary text-sm">{comments?.length || 0}</span>
      </h3>

      {comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-sm py-10 text-center border border-dashed border-[#333] rounded-xl">
          첫 번째 댓글을 남겨보세요!
        </div>
      )}
    </div>
  );
};

export default CommentList;
