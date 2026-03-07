import { createHashRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import { Loading } from '@/components/ui';
import BlogDetail from '@/pages/BlogDetail';
import BlogWrite from '@/pages/BlogWrite';

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
      {
        path: 'blog/write',
        element: (
          <Suspense fallback={<Loading />}>
            <BlogWrite />
          </Suspense>
        ),
      },
      {
        path: 'blog/:id',
        element: <BlogDetail />,
      },
      {
        path: 'blog/edit/:id',
        element: (
          <Suspense fallback={<Loading />}>
            <Blog />
          </Suspense>
        ),
      },
    ],
  },
]);
