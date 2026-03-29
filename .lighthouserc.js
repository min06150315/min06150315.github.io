export default {
  ci: {
    collect: {
      staticDistDir: '/dist',
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox --disable-setuid-sandbox --headless',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
