import { PageHeader } from '@/components/ui';
import { PAGE_CONTENT } from '@/constants/contents';

const HomePage = () => {
  const { title, contents } = PAGE_CONTENT.HOME;

  return (
    <div>
      <PageHeader title={title} contents={contents} />
    </div>
  );
};

export default HomePage;
