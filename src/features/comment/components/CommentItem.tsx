import { useState, useEffect } from 'react';
import { formatRelative } from '@/utils';
import type { Comment } from '@/types';
import { useUpdateComment, useDeleteComment } from '@/hooks/useComment';
import supabase from '@/lib/supabase';
import { Pencil, Trash2, X, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import DeleteConfirmModal from '@/features/modal/DeleteConfirmModal';

interface CommentItemProps {
  comment: Comment;
}

const CommentItem = ({ comment }: CommentItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { mutate: updateMutate, isPending: isUpdating } = useUpdateComment(
    comment.post_id,
  );
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteComment(
    comment.post_id,
  );

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id || null);
    };
    checkUser();
  }, []);

  const isAuthor = currentUserId === comment.user_id;

  const confirmDelete = () => {
    deleteMutate(Number(comment.id), {
      onSuccess: () => setIsDeleteModalOpen(false),
    });
  };

  const handleUpdate = (id: string | number) => {
    if (!editContent.trim()) return;
    updateMutate(
      { commentId: Number(id), content: editContent },
      {
        onSuccess: () => setIsEditing(false),
      },
    );
  };

  return (
    <div className="flex gap-3 md:gap-4 p-4 md:p-5 bg-surface-low border border-hover-black rounded-xl shadow-sm mb-4 transition-all hover:border-border-muted group">
      <div className="shrink-0">
        <img
          src={comment.author_avatar || '/default-avatar.png'}
          alt={comment.author_name}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-border-muted object-cover"
        />
      </div>

      <div className="flex flex-col grow min-w-0">
        <div className="flex items-center justify-between mb-1.5 md:mb-2 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              to={`https://github.com/${comment.github_id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-on-surface text-sm truncate hover:text-primary hover:underline transition-all shrink"
              title={`${comment.author_name}님의 GitHub 방문하기`}
            >
              <span className="font-bold text-on-surface text-sm truncate">
                {comment.author_name}
              </span>
            </Link>
            <span className="text-on-surface-variant/80 text-[11px] md:text-xs shrink-0">
              {formatRelative(comment.created_at)}
            </span>
          </div>

          {isAuthor && !isEditing && (
            <div className="flex gap-0.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 shrink-0">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 hover:bg-primary/10 rounded-md text-on-surface-variant hover:text-primary transition-colors"
                title="수정"
              >
                <Pencil size={13} />
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(true)}
                className="p-1.5 hover:bg-error/10 rounded-md text-on-surface-variant hover:text-error transition-colors"
                title="삭제"
              >
                <Trash2 size={13} />
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2.5 md:p-3 text-sm bg-surface border border-primary/30 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              rows={3}
              autoFocus
              onFocus={(e) => {
                const tempValue = e.currentTarget.value;
                e.currentTarget.value = '';
                e.currentTarget.value = tempValue;
              }}
            />
            <div className="flex justify-end gap-1.5 mt-1">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditContent(comment.content);
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-hover-black rounded-lg transition-all"
              >
                <X size={12} /> 취소
              </button>
              <button
                onClick={() => handleUpdate(comment.id!)}
                disabled={isUpdating}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-primary-text bg-primary rounded-lg hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/10"
              >
                {isUpdating ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : (
                  <Check size={12} />
                )}
                저장
              </button>
            </div>
          </div>
        ) : (
          <p className="text-on-surface-variant text-xs md:text-sm leading-relaxed wrap-break-word whitespace-pre-wrap">
            {comment.content}
          </p>
        )}
      </div>

      {/* 삭제 확인 모달 추가 */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="댓글 삭제"
        isPending={isDeleting}
      />
    </div>
  );
};

export default CommentItem;
