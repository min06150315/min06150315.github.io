import { useQuery } from '@tanstack/react-query';
import { getPosts, getPostById } from '@/api/posts.api';

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
