export const removeMarkdown = (markdown: string) => {
  return markdown
    .replace(/!\[.*\]\(.*\)/g, '')
    .replace(/\[.*\]\(.*\)/g, '')
    .replace(/\[\s?x?\]/g, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/[#*`~_>]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};
