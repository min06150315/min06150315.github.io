import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Loading from '@/components/ui/Loading';

const Blog = lazy(() => import('@/pages/Blog'));
const Project = lazy(() => import('@/pages/Project'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ), // 공통 헤더/푸터
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'blog',
        element: <Blog />,
        loader: async () => {
          return null;
        },
      },
      {
        path: 'project',
        element: <Project />,
      },
    ],
  },
]);
