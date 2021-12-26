function SkeletonHeaderSection() {
  return (
    <>
      <div className="flex-shrink-0 border-gray-600 shadow-2xl h-44 w-44"></div>
      <div className="w-full">
        <p>PLAYLIST</p>
        <div className="h-10 max-w-2xl mt-2 bg-gray-500 rounded-sm animate-pulse"></div>
      </div>
    </>
  );
}

export default SkeletonHeaderSection;
