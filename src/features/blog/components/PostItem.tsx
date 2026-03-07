import { Link } from 'react-router-dom';
import type { Post } from '@/types';

interface PostItemProps {
  post: Post;
}

// TODO: 제목 및 내용 길이 제한, 제한 한 만큼만 보여주기

const PostItem = ({ post }: PostItemProps) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="group p-6 rounded-md hover:bg-hover-black transition-all">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-more-gray line-clamp-2 leading-relaxed">
          {post.content}
        </p>
      </div>
    </Link>
  );
};

export default PostItem;
