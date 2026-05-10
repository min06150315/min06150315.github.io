import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { 
  getCommentsByPostId, 
  createComment, 
  updateComment, 
  deleteComment, 
  getCommentById
} from '@/api/comments.api';
import type { Comment } from '@/types';

export const useCommentDetail = (commentId: number) => {
  return useQuery({
    queryKey: ['comment', commentId],
    queryFn: () => getCommentById(commentId),
    enabled: !!commentId,
    retry: false,
  });
}

export const useComments = (postId: number) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => getCommentsByPostId(postId),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (content: string) => createComment(postId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};

export const useUpdateComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) => 
      updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};

export const useDeleteComment = (postId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};