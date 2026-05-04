import { Outlet, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/api/auth';

export const AdminLayout = () => {
  const { isAdmin, isLoading } = useAuth();

  if (isLoading) return <div>권한 확인 중...</div>;

  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r border-border-muted p-6">
        <h2 className="text-xl font-bold mb-8 text-primary">Admin Page</h2>
        <nav className="space-y-4">
          <Link to="/admin" className="block hover:text-primary">
            게시물 관리
          </Link>
          <Link to="/admin/blog/write" className="block hover:text-primary">
            새 글 쓰기
          </Link>
          <Link to="/" className="block hover:text-primary">
            블로그로 돌아가기
          </Link>
          <button onClick={signOut} className="hover:text-primary">
            로그아웃
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <Outlet />
      </main>
    </div>
  );
};
