export default {
  ci: {
    collect: {
      staticDistDir: '/dist',
      url: ['http://localhost:33365/'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --disable-setuid-sandbox --headless',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
