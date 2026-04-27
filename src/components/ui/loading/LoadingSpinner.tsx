import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 20 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <Loader2 size={size} className="text-sky-400 animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
