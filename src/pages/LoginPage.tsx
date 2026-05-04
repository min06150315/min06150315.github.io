import { signInWithGithub } from '@/api/auth';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { user, isAdmin } = useAuth();

  if (user && isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-8">Admin Access</h1>
      <button
        onClick={signInWithGithub}
        className="px-6 py-3 bg-github text-on-surface rounded-lg flex items-center gap-2 hover:bg-github/90 transition-colors"
      >
        Sign in with GitHub
      </button>
      {user && !isAdmin && (
        <p className="mt-4 text-error text-sm\">관리자 계정이 아닙니다.</p>
      )}
    </div>
  );
};

export default LoginPage;
