import { type FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 md:p-10 mt-10 md:mt-16">
      <div className="text-6xl mb-6">⚠️</div>

      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2 md:mb-4">
        문제가 발생했습니다.
      </h2>

      <p className="text-on-surface-more text-sm md:text-base mb-8 max-w-sm">
        페이지를 불러오는 중 예상치 못한 오류가 발생했습니다. 다시 시도해
        주세요.
      </p>

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 w-full md:w-auto px-4 md:px-0">
        <button
          onClick={resetErrorBoundary}
          className="w-full md:w-auto px-8 py-3 bg-primary text-primary-text rounded-xl font-bold transition-all active:scale-95 hover:opacity-90 shadow-lg shadow-primary/20"
        >
          다시 시도
        </button>

        <button
          onClick={() => (window.location.href = '/')}
          className="w-full md:w-auto px-8 py-3 bg-surface text-on-surface-more rounded-xl font-bold transition-all active:scale-95 hover:bg-surface-variant border border-hover-black"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
