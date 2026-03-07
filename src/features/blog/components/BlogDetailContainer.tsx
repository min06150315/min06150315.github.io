import { Loading } from '@/components/ui';
import { usePostDetail } from '@/hooks/queries/usePosts';
import { useParams } from 'react-router-dom';
import { formatDateLong } from '@/utils';

const BlogDetailContainer = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = usePostDetail(Number(id));

  // TODO: 게시물 스켈레톤 스크린 추가
  if (isLoading) return <Loading />;

  if (isError) return <div>에러</div>;

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      {/* 뒤로가기 버튼 */}
      {/* <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-blue-500 mb-8 flex items-center gap-2 transition-colors"
      >
        ← 뒤로가기
      </button> */}

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-slate-100 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center text-sm text-slate-500">
          <span>{formatDateLong(post.created_at)}</span>
        </div>
      </header>

      {/* 본문 영역 */}
      <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg">
        <p className="mb-4">{post.content}</p>
      </div>
    </article>
  );
};

export default BlogDetailContainer;
