// src/components/blog/InternalLinkCard.tsx
import { usePostDetail } from '@/hooks/usePost';
import { Link } from 'react-router-dom';

const InternalLinkCard = ({ postId }: { postId: string }) => {
  const { data: post, isLoading } = usePostDetail(postId);

  if (isLoading)
    return (
      <div className="h-24 w-full bg-hover-black animate-pulse rounded-xl mb-4" />
    );
  if (!post) return null;

  return (
    <Link
      to={`/blog/${post.id}`}
      className="flex gap-4 p-4 my-6 bg-surface-low border border-hover-black rounded-xl hover:border-primary/50 transition-all group no-underline"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 overflow-hidden rounded-lg bg-hover-black">
        <img
          src={post.thumbnail_image as string}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          alt={post.title}
        />
      </div>

      <div className="flex flex-col justify-center overflow-hidden">
        <span className="text-xs text-primary font-bold mb-1">연관 포스트</span>
        <h4 className="text-base md:text-lg font-bold text-on-surface mb-1 line-clamp-1 group-hover:text-primary transition-colors">
          {post.title}
        </h4>
        <p className="text-sm text-on-surface-variant line-clamp-2 leading-snug">
          {post.content.replace(/[#*`]/g, '').slice(0, 100)}...
        </p>
      </div>
    </Link>
  );
};

export default InternalLinkCard;
