import { PageHeader } from '@/components/ui';
import { PAGE_CONTENT } from '@/constants/contents';

const NotFoundPage = () => {
  const { title, contents } = PAGE_CONTENT.NOTFOUND;

  return (
    <div>
      <PageHeader title={title} contents={contents} />
    </div>
  );
};

export default NotFoundPage;
