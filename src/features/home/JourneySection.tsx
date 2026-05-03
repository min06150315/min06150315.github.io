import { motion } from 'framer-motion';

const JourneySection = () => {
  const journeys = [
    {
      date: '2027.03 ~',
      title: '한동대학교 복학',
      subtitle: '복학 후 CS 공부 및 심화 프로젝트',
    },
    {
      date: '2025.05 - 2026.11',
      title: '군 복무',
      subtitle: '제한된 환경 속에서 개인 블로그 구축 및 지속적인 전공 학습',
    },
    {
      date: '2024.09 - 2025.03',
      title: 'CRA',
      subtitle: '전산 학술 동아리 활동',
    },
    {
      date: '2023.03 - 2025.03',
      title: '한동대학교 입학',
      subtitle: '전산전자공학부 컴퓨터공학심화 전공',
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16 tracking-tight">
          Journey
        </h2>

        <div className="relative">
          <div className="absolute left-0 top-0 h-full w-px bg-gray-800" />

          {journeys.map((journey, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              className="relative pl-8 mb-16 last:mb-0"
            >
              <div
                className={`absolute left-[-4.5px] top-1.5 w-2.5 h-2.5 rounded-full border-2 
                ${index === 1 ? 'bg-primary border-primary shadow-[0_0_8px_rgba(56,189,248,0.6)]' : 'bg-surface border-gray-700'}`}
              />

              <div className="mb-2">
                <span className="text-sm font-mono text-gray-500 tracking-tighter uppercase">
                  {journey.date}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-on-surface mb-1">
                  {journey.title}
                </h3>
                <div className="text-primary/90 text-sm font-medium mb-2">
                  {journey.subtitle}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
