import { Link } from 'react-router-dom';
import { formatDateLong, removeMarkdown } from '@/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const cleanContent = removeMarkdown(post.content || '');

  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="group flex flex-col h-full bg-less-black border border-hover-black rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 ease-out shadow-lg">
        <div className="relative aspect-video w-full overflow-hidden bg-hover-black">
          {post.thumbnail_image ? (
            <img
              src={post.thumbnail_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#333] font-bold text-lg select-none">
              {'이미지가 없습니다.'}
            </div>
          )}
        </div>

        <div className="flex flex-col p-5 flex-grow">
          <h2 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h2>

          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4 flex-grow">
            {cleanContent}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-hover-black text-xs text-gray-500">
            <span>{formatDateLong(String(post.created_at))}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
