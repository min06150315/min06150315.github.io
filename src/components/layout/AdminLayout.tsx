import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/api/auth';

export const AdminLayout = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) return <div>권한 확인 중...</div>;

  // 관리자가 아니면 메인으로 쫓아냄
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen">
      {/* 어드민 사이드바 (선택 사항) */}
      <aside className="w-64 border-r border-[#333] p-6">
        <h2 className="text-xl font-bold mb-8 text-blue-500">Admin Page</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-blue-400">
            게시물 관리
          </Link>
          <Link to="/admin/blog/write" className="block hover:text-blue-400">
            새 글 쓰기
          </Link>
          <Link to="/" className="block hover:text-blue-400">
            블로그로 돌아가기
          </Link>
          <button
            onClick={signOut}
            className="cursor-pointer hover:text-blue-400"
          >
            로그아웃
          </button>
        </nav>
      </aside>

      {/* 어드민 메인 컨텐츠 */}
      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};
