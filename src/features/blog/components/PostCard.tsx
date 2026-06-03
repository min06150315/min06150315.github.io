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
        <div className="flex gap-3 sm:gap-6 p-3 sm:p-5 bg-surface-low border border-hover-black rounded-xl hover:border-primary/50 transition-all shadow-sm">
          <div className="w-24 sm:w-44 md:w-52 aspect-video rounded-lg overflow-hidden shrink-0 bg-hover-black relative">
            {post.thumbnail_image ? (
              <img
                src={post.thumbnail_image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-border-muted text-xs select-none">
                이미지가 없습니다.
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center overflow-hidden min-w-0 flex-1">
            <h2 className="text-base sm:text-lg font-bold text-on-surface mb-1.5 sm:mb-2 line-clamp-1 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 mb-2 sm:mb-3 leading-relaxed">
              {cleanContent}
            </p>
            <span className="text-[11px] sm:text-xs text-on-surface-variant/80">
              {formatRelative(post.created_at)}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="group flex flex-col h-full bg-surface-low border border-hover-black rounded-xl overflow-hidden hover:border-primary/50 md:hover:-translate-y-1.5 transition-all duration-300 ease-out shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-hover-black">
          {post.thumbnail_image ? (
            <img
              src={post.thumbnail_image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-border-muted font-bold text-sm select-none">
              {'이미지가 없습니다.'}
            </div>
          )}
        </div>

        <div className="flex flex-col p-4 sm:p-5 grow">
          <h2 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-on-surface group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h2>

          <p className="text-on-surface-variant text-xs sm:text-sm line-clamp-3 leading-relaxed mb-4 grow">
            {cleanContent}
          </p>

          <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-hover-black text-[11px] sm:text-xs text-on-surface-variant/80">
            <span>{formatRelative(post.created_at)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
