import { createHashRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import { Loading } from '@/components/ui';

const Blog = lazy(() => import('@/pages/Blog'));

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <MainLayout>
        <NotFound />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'blog',
        element: (
          <Suspense fallback={<Loading />}>
            <Blog />
          </Suspense>
        ),
      },
    ],
  },
]);
