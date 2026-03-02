import { Outlet } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
