import ReactMarkdown from 'react-markdown';
import InternalLinkCard from './InternalLinkCard';
import { getInternalPostId } from '@/utils/url';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

const PostViewer = ({ content }: { content: string }) => {
  return (
    <div
      className="prose prose-invert max-w-none text-on-surface leading-relaxed text-sm md:text-lg mb-10 md:mb-16 
                    prose-headings:font-bold prose-p:text-on-surface-variant/90 prose-a:no-underline 
                    prose-pre:p-3 md:prose-pre:p-4 prose-sm md:prose-base wrap-break-word"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          a: ({ href, children }) => {
            const postId = href ? getInternalPostId(href) : null;

            if (postId) {
              return <InternalLinkCard postId={postId as string} />;
            }

            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-blue-400 underline underline-offset-4 transition-colors"
              >
                {children}
              </a>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default PostViewer;
