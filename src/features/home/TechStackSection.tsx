import { Icon } from '@iconify/react';
import { TECH_STACK_ICONS } from '@/constants/tech-stack-icons';

const TechStackSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-24">
      <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-2 text-on-surface">
        기술 스택 및 도구
      </h2>
      <p className="text-on-surface-variant text-sm md:text-base font-body mb-8 md:mb-16">
        아래의 기술을 사용할 수 있습니다.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {TECH_STACK_ICONS.map((tech) => (
          <div
            key={tech.name}
            className="group p-4 sm:p-6 md:p-8 bg-stitch-surface-container-lowest rounded-2xl 
            flex flex-col items-center justify-center gap-3 md:gap-4 transition-all 
            hover:bg-stitch-surface-container-highest hover:-translate-y-1 border border-hover-black"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
              {tech.icon.startsWith('https') ? (
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-60 group-hover:opacity-100 md:group-hover:scale-120 transition-all"
                />
              ) : (
                <Icon
                  icon={tech.icon}
                  className="text-3xl md:text-4xl opacity-60 group-hover:opacity-100 md:group-hover:scale-120 transition-all"
                />
              )}
            </div>
            <span className="text-[11px] md:text-xs font-medium text-stitch-on-surface-variant group-hover:text-stitch-primary transition-colors font-body">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TechStackSection;
