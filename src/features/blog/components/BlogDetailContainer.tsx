import { Loading } from '@/components/ui';
import { usePostDetail } from '@/hooks/usePost';
import { useParams } from 'react-router-dom';
import { formatDateLong } from '@/utils';
import CommentList from '@/features/comment/components/CommentList';
// import { Pencil, Trash2, ChevronLeft } from 'lucide-react';

const BlogDetailContainer = () => {
  // const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // TODO: ID에 해당하는 게시물이 없으면 404 처리

  const { data: post, isLoading, isError } = usePostDetail(Number(id));

  const { id: postId } = useParams<{ id: string }>();
  const numericPostId = Number(postId);
  // const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  // TODO: 게시물 스켈레톤 스크린 추가
  if (isLoading) return <Loading />;

  if (isError) return <div>에러</div>;

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  // const handleDelete = () => {
  //   if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
  //     deletePost(id!);
  //   }
  // };

  return (
    <article className="max-w-3xl mx-auto pb-12 px-4">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-base-light-gray mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center text-sm text-slate-500">
          <span>{formatDateLong(post.created_at)}</span>
        </div>
      </header>

      {/* 내용 */}
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
      <div className="whitespace-pre-wrap prose prose-invert max-w-none text-base-middle-gray leading-relaxed text-lg">
        <p className="mb-4">{post.content}</p>
      </div>

      <section id="comments">
        <CommentList postId={numericPostId} />
      </section>
    </article>
  );
};

export default BlogDetailContainer;
