import { createClient } from '@supabase/supabase-js';
import imageCompression from 'browser-image-compression';

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
  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 1200,
    useWebWorker: true,
    fileType: 'image/webp',
  };

  try {
    const compressedFile = await imageCompression(file, options);

    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.webp`;
    const filePath = `${location}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('blog-assets')
      .upload(filePath, compressedFile);

    if (uploadError) {
      throw new Error('이미지 업로드 실패');
    }

    const { data } = supabase.storage
      .from('blog-assets')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Image Compression Error:', error);
    throw new Error('이미지 최적화 및 업로드 중 오류 발생');
  }
};

export default supabase;
