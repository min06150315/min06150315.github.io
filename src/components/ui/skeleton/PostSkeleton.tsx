const PostSkeleton = () => {
  return (
    <div className="flex flex-col h-full bg-less-black border border-hover-black rounded-xl overflow-hidden shadow-lg">
      <div className="relative aspect-video w-full overflow-hidden bg-hover-black animate-pulse" />

      <div className="flex flex-col p-5 grow">
        <div className="h-7 bg-hover-black rounded-md mb-3 w-3/4 animate-pulse" />

        <div className="space-y-2 mb-4 grow">
          <div className="h-4 bg-hover-black rounded w-full animate-pulse" />
          <div className="h-4 bg-hover-black rounded w-full animate-pulse" />
          <div className="h-4 bg-hover-black rounded w-2/3 animate-pulse" />
        </div>

        <div className="pt-4 border-t border-hover-black">
          <div className="h-3 bg-hover-black rounded w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
