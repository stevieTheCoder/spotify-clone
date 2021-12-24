function SkeletonSideBar() {
  return (
    <div className="flex flex-col space-y-4 animate-pulse">
      <div className="flex space-x-2">
        <div className="h-5 w-5 rounded-full bg-gray-500"></div>
        <div className="h-5 flex-1 bg-gray-500 rounded-sm"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-5 w-5 rounded-full bg-gray-500"></div>
        <div className="h-5 flex-1 bg-gray-500 rounded-sm"></div>
      </div>
      <div className="flex space-x-2">
        <div className="h-5 w-5 rounded-full bg-gray-500"></div>
        <div className="h-5 flex-1 bg-gray-500 rounded-sm"></div>
      </div>
    </div>
  );
}

export default SkeletonSideBar;
