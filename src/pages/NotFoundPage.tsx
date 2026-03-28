import { PageHeader } from '@/components/ui';
import { PAGE_CONTENT } from '@/constants/contents';

const NotFoundPage = () => {
  const { title, contents } = PAGE_CONTENT.NOTFOUND;

  return <PageHeader title={title} contents={contents} />;
};

export default NotFoundPage;
