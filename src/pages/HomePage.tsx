import { PageHeader } from '@/components/ui';
import { PAGE_CONTENT } from '@/constants/contents';

const HomePage = () => {
  const { title, contents } = PAGE_CONTENT.HOME;

  return <PageHeader title={title} contents={contents} />;
};

export default HomePage;
