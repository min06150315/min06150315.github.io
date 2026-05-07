import RecentPosts from '@/features/home/RecentPosts';
import JourneySection from '@/features/home/JourneySection';
import ContactSection from '@/features/home/ContactSection';
import TechStackSection from '@/features/home/TechStackSection';
import TitleSection from '@/features/home/TitleSection';

const HomePage = () => {
  return (
    <>
      <TitleSection /> {/* 제목*/}
      <TechStackSection /> {/* 기술스택*/}
      <JourneySection /> {/* 경력 */}
      <RecentPosts /> {/* 최근 게시물 */}
      <ContactSection /> {/* 연락 */}
    </>
  );
};

export default HomePage;
