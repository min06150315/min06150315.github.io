import supabase from '@/lib/supabase';
import type { Post } from '@/types';

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data as Post[];
};

export const getPostById = async (id: string | number): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data as Post;
};

export const createPost = async (
  newPost: Omit<Post, 'title' | 'content'>,
): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .insert([newPost])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Post;
};

export const updatePost = async (
  id: string | number,
  updatedPost: Partial<Post>,
): Promise<void> => {
  const { error } = await supabase
    .from('posts')
    .update(updatedPost)
    .eq('id', id);

  if (error) throw new Error(error.message);
};

export const deletePost = async (id: string | number): Promise<void> => {
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) throw new Error(error.message);
};
