import { PageHeader } from '@/components/ui/PageHeader';
import { PAGE_CONTENT } from '@/constants/contents';

export const NotFound = () => {
  const { title, contents } = PAGE_CONTENT.NOTFOUND;

  return (
    <div>
      <PageHeader title={title} contents={contents} />
    </div>
  );
}

