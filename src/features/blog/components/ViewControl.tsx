import { LayoutGrid, List } from 'lucide-react';
import { useViewStore } from '@/store/useViewStore';

const ViewControl = () => {
  const { viewMode, setViewMode } = useViewStore();

  return (
    <div className="flex justify-end gap-2 mb-6">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'grid'
            ? 'bg-primary text-surface-low'
            : 'bg-hover-black text-primary'
        }`}
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-colors ${
          viewMode === 'list'
            ? 'bg- text-surface-low'
            : 'bg-hover-black text-primary'
        }`}
      >
        <List size={20} />
      </button>
    </div>
  );
};

export default ViewControl;
