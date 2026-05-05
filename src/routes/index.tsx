import { createHashRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import HomePage from '@/pages/HomePage';
import BlogDetailPage from '@/pages/BlogDetailPage';
import BlogWritePage from '@/pages/BlogWritePage';
import BlogEditPage from '@/pages/BlogEditPage';
// import LoginPage from '@/pages/LoginPage';
import AdminPage from '@/pages/AdminPage';
import ContactPage from '@/pages/ContactPage';
import CommingSoonPage from '@/pages/CommingSoonPage';

const Blog = lazy(() => import('@/pages/BlogListPage'));

export const router = createHashRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <MainLayout>
        <NotFoundPage />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'about',
        element: <CommingSoonPage />,
      },
      // {
      //   path: 'login',
      //   element: <LoginPage />,
      // },
      {
        path: 'blog',
        element: (
          <Suspense>
            <Blog />
          </Suspense>
        ),
      },
      {
        path: 'blog/:id',
        element: <BlogDetailPage />,
      },
      {
        path: 'admin',
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminPage />,
          },
          {
            path: 'blog/write',
            element: (
              <Suspense>
                <BlogWritePage />
              </Suspense>
            ),
          },
          {
            path: 'blog/edit/:id',
            element: (
              <Suspense>
                <BlogEditPage />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
]);
