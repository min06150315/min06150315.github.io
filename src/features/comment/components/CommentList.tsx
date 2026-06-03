import { useComments } from '@/hooks/useComment';
import CommentItem from './CommentItem';
import { Loader2 } from 'lucide-react';
import CommentInput from './CommentInput';
import type { Comment } from '@/types';
import { useState, useEffect } from 'react';
import supabase from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { LogOut } from 'lucide-react'; // 아이콘 활용

interface CommentListProps {
  postId: number;
}

const CommentList = ({ postId }: CommentListProps) => {
  const [user, setUser] = useState<User | null>(null);
  const { data: comments, isLoading, error } = useComments(postId);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await supabase.auth.signOut();
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-error text-sm py-8 text-center border-t border-hover-black">
        댓글을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="pt-8 md:pt-10 border-t border-hover-black">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8 gap-3 md:gap-4">
        <h3 className="text-base md:text-lg font-bold text-on-surface flex items-center gap-2">
          댓글{' '}
          <span className="text-primary text-sm font-semibold">
            {comments?.length || 0}
          </span>
        </h3>

        {user && (
          <div className="flex items-center justify-between md:justify-start gap-3 bg-surface-low px-3 py-2 rounded-xl border border-hover-black w-full md:w-auto">
            <img
              src={user.user_metadata.avatar_url || '/default-avatar.png'}
              className="w-5 h-5 md:w-6 md:h-6 rounded-full shrink-0"
              alt="me"
            />
            <span className="text-[11px] md:text-xs text-on-surface-variant font-medium truncate">
              <span className="text-on-surface font-semibold">
                {user.user_metadata.full_name}
              </span>
              님으로 로그인 중
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[11px] text-error/80 hover:text-error shrink-0 transition-colors py-0.5 px-1.5 hover:bg-error/5 rounded-md"
            >
              <LogOut size={12} /> 로그아웃
            </button>
          </div>
        )}
      </div>
      <div className="mb-8 md:mb-10">
        <CommentInput postId={postId} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-slate-700" />
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-3 md:space-y-4">
          {comments.map((comment: Comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-xs md:text-sm text-on-surface-variant/60">
          아직 작성된 댓글이 없습니다. 첫 댓글을 남겨보세요!
        </div>
      )}
    </div>
  );
};

export default CommentList;
