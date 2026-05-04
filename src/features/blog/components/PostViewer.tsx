import ReactMarkdown from 'react-markdown';
import InternalLinkCard from './InternalLinkCard';
import { getInternalPostId } from '@/utils/url';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';

const PostViewer = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert max-w-none text-on-surface leading-relaxed text-lg mb-16">
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
