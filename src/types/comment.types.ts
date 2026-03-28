export interface Comment {
  id?: number;
  post_id: number;
  user_id: string;
  author_name: string;
  author_avatar: string | null;
  content: string;
  created_at?: Date;
}
