import { useQuery } from '@tanstack/react-query';
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
