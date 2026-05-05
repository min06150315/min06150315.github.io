export const getInternalPostId = (url: string) => {
  try {
    const urlObj = new URL(url);

    if (urlObj.hostname !== window.location.hostname) {
      return null;
    }

    if (urlObj.hash) {
      const hashPath = urlObj.hash.split('?')[0];
      const parts = hashPath.split('/').filter(Boolean);

      if (parts[1] === 'blog' && parts[2]) {
        return parts[2];
      }
    }

    const pathParts = urlObj.pathname.split('/');
    if (pathParts[1] === 'blog' && pathParts[2]) {
      return pathParts[2];
    }

    return null;
  } catch (error) {
    const segments = url.split('/').filter(Boolean);
    if (segments.includes('blog')) {
      const blogIndex = segments.indexOf('blog');
      return segments[blogIndex + 1] || null;
    }
    return error;
  }
};
