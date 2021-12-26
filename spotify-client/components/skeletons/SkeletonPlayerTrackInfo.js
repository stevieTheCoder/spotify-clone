const SkeletonPlayerTrackInfo = () => {
  return (
    <div className="flex items-center w-1/2 pt-2 space-x-4 animate-pulse md:pt-0">
      <div className="flex-shrink-0 w-10 h-10 bg-gray-500" />
      <div className="flex flex-col flex-1 max-w-xs space-y-2">
        <div className="bg-gray-500 rounded-sm min-h-3"></div>
        <div className="w-24 text-gray-500 bg-gray-500 rounded-sm min-h-3"></div>
      </div>
    </div>
  );
};

export default SkeletonPlayerTrackInfo;
