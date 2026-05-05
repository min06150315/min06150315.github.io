import LoadingSpinner from '@/components/ui/loading/LoadingSpinner';
import { usePostDetail } from '@/hooks/usePost';
import { useParams } from 'react-router-dom';
import { formatRelative } from '@/utils';
import CommentList from '@/features/comment/components/CommentList';
import PostViewer from './PostViewer';
import SEO from '@/components/common/SEO';

const BlogDetailContainer = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: ID에 해당하는 게시물이 없으면 404 처리

  const { data: post, isLoading, isError } = usePostDetail(Number(id));

  const { id: postId } = useParams<{ id: string }>();
  const numericPostId = Number(postId);

  // TODO: 게시물 스켈레톤 스크린 추가
  if (isLoading) return <LoadingSpinner />;

  if (isError) return <div>에러</div>;

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  return (
    <>
      <SEO
        title={post.title}
        description={post.content.slice(0, 150).replace(/[#*`]/g, '')}
        image={post.thumbnail_image as string}
      />
      <article className="max-w-3xl mx-auto pb-12 px-4">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-on-surface mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-x-2 text-sm text-on-surface-more">
            <span>{formatRelative(post.created_at)}</span>
          </div>
        </header>

        {post.thumbnail_image ? (
          <div className="relative aspect-video h-full mb-6">
            <img
              src={post.thumbnail_image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <></>
        )}

        <PostViewer content={post.content} />

        <section id="comments">
          <CommentList postId={numericPostId} />
        </section>
      </article>
    </>
  );
};

export default BlogDetailContainer;
