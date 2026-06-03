import { PageHeader } from '@/components/ui';
import PostList from '@/features/blog/components/PostList';
import { PAGE_CONTENT } from '@/constants/contents';
import ViewControl from '@/features/blog/components/ViewControl';

const BlogListPage = () => {
  const { title, contents } = PAGE_CONTENT.BLOG;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-4 md:mb-8 border-b border-hover-black/30 md:border-b-0 pb-2 md:pb-0">
        <PageHeader title={title} contents={contents} />
        <ViewControl />
      </div>
      <PostList />
    </div>
  );
};

export default BlogListPage;
