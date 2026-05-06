export default {
  ci: {
    collect: {
      staticDistDir: './dist',
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
