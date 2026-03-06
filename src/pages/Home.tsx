import { PageHeader } from '@/components/ui/PageHeader';
import { PAGE_CONTENT } from '@/constants/contents';

function Home() {
  const { title, contents } = PAGE_CONTENT.HOME;

  return (
    <div>
      <PageHeader title={title} contents={contents} />
    </div>
  );
}

export default Home;
