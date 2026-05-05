import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import supabase from '@/lib/supabase';
import type { Post } from '@/types';
import { removeMarkdown } from '@/utils';

const RecentPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);

        const { data } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (data) setPosts(data);
      } catch (error) {
        console.error('게시물을 불러오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading)
    return (
      <div className="text-center py-20 text-on-surface-variant">
        Loading posts...
      </div>
    );

  return (
    <section className="w-full max-w-7xl mx-auto px-6 my-32">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-2">
            Recent <span className="text-primary font-mono italic">Posts</span>
          </h2>
          <p className="text-on-surface-variant">
            기술적인 도전과 해결 과정을 기록합니다
          </p>
        </div>
        <Link
          to="/blog"
          className="group text-primary flex items-center gap-2 text-xs tracking-widest uppercase font-bold"
        >
          View all posts{' '}
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/blog/${post.id}`}>
              <div className="aspect-16/10 overflow-hidden rounded-2xl mb-6 border border-border-muted">
                {post.thumbnail_image ? (
                  <img
                    src={post.thumbnail_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-border-muted font-bold text-lg select-none">
                    {'이미지가 없습니다.'}
                  </div>
                )}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400 mb-2 block">
                {post.category}
              </span>
              <h3 className="text-[17px] font-bold text-on-surface mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-on-surface-variant text-sm line-clamp-2 mb-4">
                {removeMarkdown(post.content)}
              </p>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
