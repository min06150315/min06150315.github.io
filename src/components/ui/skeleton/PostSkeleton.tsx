interface PostSkeletonProps {
  viewMode?: 'grid' | 'list';
}

const PostSkeleton = ({ viewMode = 'grid' }: PostSkeletonProps) => {
  if (viewMode === 'list') {
    return (
      <div className="flex gap-3 sm:gap-6 p-3 sm:p-5 bg-surface-low border border-hover-black rounded-xl shadow-sm w-full">
        <div className="w-24 sm:w-44 md:w-52 aspect-video rounded-lg bg-hover-black animate-pulse shrink-0" />
        
        <div className="flex flex-col justify-center flex-1 space-y-2 min-w-0">
          <div className="h-5 bg-hover-black rounded-md w-2/3 animate-pulse" />
          
          <div className="space-y-1.5 w-full">
            <div className="h-3.5 bg-hover-black rounded w-full animate-pulse" />
            <div className="h-3.5 bg-hover-black rounded w-4/5 animate-pulse sm:block hidden" />
          </div>
          
          <div className="h-3 bg-hover-black rounded w-20 animate-pulse pt-0.5" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface-low border border-hover-black rounded-xl overflow-hidden shadow-md">
      <div className="relative aspect-video w-full bg-hover-black animate-pulse" />
      
      <div className="flex flex-col p-4 sm:p-5 grow">
        <div className="h-6 bg-hover-black rounded-md mb-3 w-3/4 animate-pulse" />
        
        <div className="space-y-2 mb-4 grow">
          <div className="h-3.5 bg-hover-black rounded w-full animate-pulse" />
          <div className="h-3.5 bg-hover-black rounded w-full animate-pulse" />
          <div className="h-3.5 bg-hover-black rounded w-2/3 animate-pulse" />
        </div>
        
        <div className="pt-3 border-t border-hover-black">
          <div className="h-3 bg-hover-black rounded w-1/4 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;