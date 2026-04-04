import { Link } from 'react-router-dom';
import { formatRelative, removeMarkdown } from '@/utils';
import type { Post } from '@/types';

interface PostCardProps {
  post: Post;
  viewMode: 'grid' | 'list';
}

const PostCard = ({ post, viewMode }: PostCardProps) => {
  const cleanContent = removeMarkdown(post.content || '');

  if (viewMode === 'list') {
    return (
      <Link to={`/blog/${post.id}`} className="group block w-full">
        <div className="flex gap-6 p-4 bg-less-black border border-hover-black rounded-xl hover:border-primary/50 transition-all">
          <div className="w-40 aspect-video rounded-lg overflow-hidden shrink-0 bg-hover-black">
            {post.thumbnail_image && (
              <img src={post.thumbnail_image} className="..." />
            )}
          </div>
          <div className="flex flex-col justify-center overflow-hidden">
            <h2 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-primary">
              {post.title}
            </h2>
            <p className="text-sm text-gray-400 line-clamp-2 mb-2">
              {removeMarkdown(post.content)}
            </p>
            <span className="text-xs text-base-white">
              {formatRelative(post.created_at)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

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

        <div className="flex flex-col p-5 grow">
          <h2 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h2>

          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4 grow">
            {cleanContent}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-hover-black text-xs text-base-white">
            <span>{formatRelative(post.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
