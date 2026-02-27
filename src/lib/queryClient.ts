import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 5분 동안 캐시 유효
      staleTime: 1000 * 60 * 5,

      // 24시간 후 가비지 컬렉션
      gcTime: 1000 * 60 * 60 * 24,

      // 쿼리 실패 시 최대 2번 재시도
      retry: 2,

      // 탭 포커스 시 자동 리패칭 활성화
      refetchOnWindowFocus: true,
    },
    mutations: {
      // 뮤테이션은 기본적으로 재시도하지 않음
      retry: 0,
    },
  },
});

export default queryClient;
