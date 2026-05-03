import { IoMdMail } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { TECH_STACK_ICONS } from '@/constants/tech-stack-icons';
import RecentPosts from '@/features/home/RecentPosts';
import { JourneySection } from '@/features/home/JourneySection';

const HomePage = () => {
  return (
    <div>
      <section className="max-w-7xl mx-auto px-8 py-24 md:py-40 relative">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="relative z-10 max-w-4xl">
          <span className="font-label text-xs tracking-widest uppercase text-primary mb-6 block font-semibold">
            Min Kyeong-bin Website
          </span>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface mb-8 leading-[1.1]">
            안녕하세요. <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary-container">
              프론트엔드 개발자
            </span>
            <br />
            민경빈입니다.
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant leading-relaxed max-w-2xl">
            React와 Next.js를 기반으로 효율적인 아키텍처와 더 나은 사용자 경험을
            추구합니다. 더 나은 방법을 찾는 것, 새로운 기술을 배우고 공유하는
            것을 좋아합니다.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-8 py-24">
        <h2 className="text-4xl font-headline font-bold tracking-tight mb-2 text-on-surface">
          기술 스택 및 도구
        </h2>
        <p className="text-on-surface-variant font-body mb-16">
          아래의 기술을 사용할 수 있습니다.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {TECH_STACK_ICONS.map((tech) => (
            <div
              key={tech.name}
              className="group p-8 bg-stitch-surface-container-lowest rounded-2xl flex flex-col items-center justify-center gap-4 transition-all hover:bg-stitch-surface-container-highest hover:-translate-y-1 border border-white/5"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                {tech.icon.startsWith('https') ? (
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-10 h-10 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                ) : (
                  <Icon
                    icon={tech.icon}
                    className="text-4xl opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                )}
              </div>
              <span className="text-xs font-medium text-stitch-on-surface-variant group-hover:text-stitch-primary transition-colors font-body">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      <JourneySection />

      <RecentPosts />

      <section className="max-w-5xl mx-auto px-8 py-8 text-center">
        <div className="p-16 rounded-4xl">
          <h2 className="font-headline text-4xl md:text-5xl font-bold mb-6">
            Let's connect!
          </h2>
          <p className="font-body text-on-surface-variant mb-8 text-xl max-w-xl mx-auto">
            감사합니다.
            <br /> 더 궁금한 점이 있다면 편하게 연락주세요
          </p>
          <Link
            className="inline-flex items-center gap-3 bg-white font-bold text-base-black px-10 py-5 rounded-xl transition-all duration-300 hover:-translate-y-2 active:scale-95"
            to="/contact"
          >
            Send a Message
            <span className="material-symbols-outlined">
              <IoMdMail />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
