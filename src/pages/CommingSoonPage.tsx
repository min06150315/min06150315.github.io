import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CommingSoonPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] md:min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 text-on-surface">
      <div className="relative mb-6 md:mb-8">
        <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 animate-pulse"></div>
        <Construction className="text-primary relative z-10 animate-bounce w-16 h-16 md:w-20 md:h-20" />
      </div>

      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight text-center break-keep">
        준비 중인 페이지입니다
      </h1>

      <p className="text-on-surface-more text-sm sm:text-base md:text-xl text-center max-w-sm md:max-w-md mb-8 md:mb-10 leading-relaxed break-keep">
        현재 블로그의 더 나은 경험을 위해 열심히 코드를 짜고 있어요! 조금만
        기다려 주세요.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-more text-primary-text text-sm md:text-base transition-all rounded-full font-medium shadow-lg shadow-blue-900/20 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
        이전 페이지로 돌아가기
      </button>
    </div>
  );
};

export default CommingSoonPage;
