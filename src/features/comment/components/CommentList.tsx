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
      <div className="text-error text-sm py-5 text-center">
        댓글을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="mt-16 pt-10 border-t border-hover-black">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
          댓글{' '}
          <span className="text-primary text-sm">{comments?.length || 0}</span>
        </h3>

        {user && (
          <div className="flex items-center gap-3 bg-surface-low px-3 py-2 rounded-lg border border-hover-black">
            <img
              src={user.user_metadata.avatar_url || '/default-avatar.png'}
              className="w-6 h-6 rounded-full"
              alt="me"
            />
            <span className="text-xs text-on-surface-variant font-medium">
              <span className="text-on-surface">
                {user.user_metadata.full_name}
              </span>
              님으로 로그인 중
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 text-[11px] text-error/70 hover:text-error ml-2 transition-colors"
            >
              <LogOut size={12} /> 로그아웃
            </button>
          </div>
        )}
      </div>
      <div className="mb-12">
        <CommentInput postId={postId} />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin text-slate-700" />
        </div>
      ) : comments && comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment: Comment) => (
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
