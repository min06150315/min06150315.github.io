import { LayoutGrid, List } from 'lucide-react';
import { useViewStore } from '@/store/useViewStore';

const ViewControl = () => {
  const { viewMode, setViewMode } = useViewStore();

  return (
    <div className="flex justify-end gap-2 mb-0 md:mb-6 shrink-0">
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded-lg transition-colors active:scale-95 ${
          viewMode === 'grid'
            ? 'bg-primary text-surface-low'
            : 'bg-hover-black text-primary hover:bg-hover-black/80'
        }`}
      >
        <LayoutGrid size={18} />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded-md transition-colors active:scale-95 ${
          viewMode === 'list'
            ? 'bg-primary text-surface-low'
            : 'bg-hover-black text-primary hover:bg-hover-black/80'
        }`}
      >
        <List size={18} />
      </button>
    </div>
  );
};

export default ViewControl;
