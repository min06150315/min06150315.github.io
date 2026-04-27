import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import ScrollToTop from '@/utils/ScrollToTop';
import { useSearchModal } from '@/features/search/useSearchModal';
import SearchModal from '@/features/search/SearchModal';

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isOpen, setIsOpen } = useSearchModal();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header onSearchOpen={() => setIsOpen(true)} />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12">
        {children || <Outlet />}
      </main>
      <SearchModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <Footer />
    </div>
  );
};

export default MainLayout;
