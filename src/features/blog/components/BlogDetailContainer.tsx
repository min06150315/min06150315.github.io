import { Loading, NavButton } from '@/components/ui';
import { useDeletePost, usePostDetail } from '@/hooks/queries/usePost';
import { useNavigate, useParams } from 'react-router-dom';
import { formatDateLong } from '@/utils';
import { Pencil, Trash2, ChevronLeft } from 'lucide-react';

const BlogDetailContainer = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // TODO: ID에 해당하는 게시물이 없으면 404 처리

  const { data: post, isLoading, isError } = usePostDetail(Number(id));
  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();

  // TODO: 게시물 스켈레톤 스크린 추가
  if (isLoading) return <Loading />;

  if (isError) return <div>에러</div>;

  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    if (window.confirm('정말 이 게시글을 삭제하시겠습니까?')) {
      deletePost(id!);
    }
  };

  return (
    <article className="max-w-3xl mx-auto pb-12 px-4">
      <div className="flex items-center justify-between mb-8">
        {/* FIXME: 뒤로가기 버튼. 꼭 있어야할까? */}
        <button
          onClick={() => navigate(-1)}
          className="group text-sm text-slate-500 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
        >
          <ChevronLeft
            size={18}
            className="transition-transform group-hover:-translate-x-1"
          />
          뒤로가기
        </button>

        {/* TODO: 어드민만 관리자 버튼 보이게하기 */}
        <div className="flex items-center gap-2 bg-slate-900/10 p-1 rounded-xl border border-white/5">
          <NavButton
            to={`/blog/edit/${id}`}
            variant="black"
            className="flex items-center gap-2 text-xs py-1.5 px-3 hover:bg-white/10"
          >
            <Pencil size={14} />
            수정
          </NavButton>
          <div className="w-[1px] h-4 bg-white/10" />
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
          >
            <Trash2 size={14} />
            {isDeleting ? '삭제 중...' : '삭제'}
          </button>
        </div>
      </div>

      <header className="mb-10">
        <h1 className="text-4xl font-bold text-slate-100 mb-4 leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center text-sm text-slate-500">
          <span>{formatDateLong(post.created_at)}</span>
        </div>
      </header>

      {/* 본문 영역 */}
      <div className="whitespace-pre-wrap prose prose-invert max-w-none text-slate-300 leading-relaxed text-lg">
        <p className="mb-4">{post.content}</p>
      </div>
    </article>
  );
};

export default BlogDetailContainer;
