import { Link } from 'react-router-dom';
import { formatDateLong } from '@/utils';
import type { Post } from '@/types'; // Post 타입이 정의되어 있다고 가정

interface PostItemProps {
  post: Post;
}

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link to={`/blog/${post.id}`} className="block">
      <div className="group flex flex-col h-full bg-[#1a1a1a] border border-[#222] rounded-xl overflow-hidden hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 ease-out shadow-lg">
        {/* 1. 썸네일 영역 (이미지가 없을 때 대비 기본 배경 처리) */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#222]">
          {post.thumbnail ? (
            <img
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#333] font-bold text-lg select-none">
              {'이미지가 없습니다.'}
            </div>
          )}
        </div>

        {/* 2. 콘텐츠 영역 */}
        <div className="flex flex-col p-5 flex-grow">
          <h2 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h2>

          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-4 flex-grow">
            {post.content}
          </p>

          {/* 3. 하단 메타 정보 */}
          <div className="flex items-center justify-between pt-4 border-t border-[#222] text-xs text-gray-500">
            <span>{formatDateLong(String(post.created_at))}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostItem;
