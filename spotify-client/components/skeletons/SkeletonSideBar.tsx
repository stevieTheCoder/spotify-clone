const SkeletonSideBar: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 animate-pulse">
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
        <div className="flex-1 h-5 bg-gray-500 rounded-sm"></div>
      </div>
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
        <div className="flex-1 h-5 bg-gray-500 rounded-sm"></div>
      </div>
      <div className="flex space-x-2">
        <div className="w-5 h-5 bg-gray-500 rounded-full"></div>
        <div className="flex-1 h-5 bg-gray-500 rounded-sm"></div>
      </div>
    </div>
  );
}

export default SkeletonSideBar;
