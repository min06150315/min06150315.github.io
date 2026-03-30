import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL 또는 Anon Key가 누락되었습니다.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const uploadImage = async (
  file: File,
  location: string,
): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
  const filePath = location + `/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from('blog-assets')
    .upload(filePath, file);

  if (uploadError) {
    throw new Error('이미지 업로드 실패');
  }

  const { data } = supabase.storage.from('blog-assets').getPublicUrl(filePath);

  return data.publicUrl;
};

export default supabase;
