export interface Post {
  id?: number;
  title: string;
  content: string;
  thumbnail_image?: string | null;
  tags?: string[];
  category?: string;
  created_at?: Date;
  updated_at?: Date;
}
