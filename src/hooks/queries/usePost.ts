import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from '@/api/posts.api';
import { useNavigate } from 'react-router-dom';
export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
};

export const usePostDetail = (postId: string | number) => {
  return useQuery({
    queryKey: ['posts', postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigate('/blog');
    },
  });
};
export const useUpdatePost = (postId: string | number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      updatePost(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
      navigate(`/blog/${postId}`);
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      alert('Deleted');
      navigate('/blog');
    },
  });
};
