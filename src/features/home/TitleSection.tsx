const TitleSection = () => {
  return (
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
          추구합니다. 더 나은 방법을 찾는 것, 새로운 기술을 배우고 공유하는 것을
          좋아합니다.
        </p>
      </div>
    </section>
  );
};

export default TitleSection;
