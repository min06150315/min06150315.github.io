import { PageHeader } from '@/components/ui';
import PostList from '@/features/blog/components/PostList';
import { PAGE_CONTENT } from '@/constants/contents';

const BlogListPage = () => {
  const { title, contents } = PAGE_CONTENT.BLOG;

  return (
    <>
      <PageHeader title={title} contents={contents} />
      <PostList />
    </>
  );
};

export default BlogListPage;
