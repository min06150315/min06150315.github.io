import { formatRelative } from '@/utils'; // 기존에 만드신 날짜 함수 활용
import type { Comment } from '@/types';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  return (
    <div className="flex gap-4 p-5 bg-surface-low border border-hover-black rounded-xl shadow-sm mb-4 transition-all hover:border-border-muted">
      {/* 작성자 아바타 */}
      <div className="shrink-0">
        <img
          src={comment.author_avatar || '/default-avatar.png'}
          alt={comment.author_name}
          className="w-10 h-10 rounded-full border border-border-muted object-cover"
        />
      </div>

      {/* 댓글 콘텐츠 */}
      <div className="flex flex-col grow min-w-0">
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-on-surface text-sm truncate">
            {comment.author_name}
          </span>
          <span className="text-on-surface-variant text-xs">
            {formatRelative(comment.created_at)}
          </span>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed wrap-break-word">
          {comment.content}
        </p>
      </div>
    </div>
  );
};

export default CommentItem;
