import { PageHeader } from '@/components/ui';
import PostList from '@/features/blog/components/BlogList';
import { PAGE_CONTENT } from '@/constants/contents';

const Blog = () => {
  const { title, contents } = PAGE_CONTENT.BLOG;

  return (
    <div>
      <PageHeader title={title} contents={contents} />
      <PostList />
    </div>
  );
};

export default Blog;
