import { supabase } from '@/lib/supabase';
import type { Post } from '@/types';

export const getPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  console.log(data);
  if (error) throw new Error(error.message);
  return data as Post[];
};

export const getPostById = async (id: string | number): Promise<Post> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  console.log(data);
  if (error) throw new Error(error.message);
  return data as Post;
};
