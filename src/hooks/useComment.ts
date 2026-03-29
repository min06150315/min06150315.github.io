import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import supabase from '@/lib/supabase';
import type { Comment } from '@/types';

export const useComment = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],

    queryFn: async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('댓글 로딩 에러:', error.message);
        throw new Error(error.message);
      }

      return data || [];
    },

    enabled: !!postId,

    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('로그인이 필요합니다.');

      const { data, error } = await supabase
        .from('comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          author_name:
            user.user_metadata.full_name || user.email?.split('@')[0],
          author_avatar: user.user_metadata.avatar_url,
          content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};
