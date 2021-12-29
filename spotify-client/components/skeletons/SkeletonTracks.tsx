import React from "react";

const SkeletonTrack: React.FC = () => {
  return (
    <div className="flex-col px-8 space-y-1 animate-pulse">
      <div className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900">
        <div className="flex items-center space-x-4 min-w-min">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-500"></div>
          <div className="space-y-2">
            <div className="bg-gray-500 rounded-sm min-h-4 w-14 lg:w-64"></div>
            <div className="w-40 bg-gray-500 rounded-sm min-h-4"></div>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0 ">
          <div className="hidden w-40 h-5 bg-gray-500 rounded-sm md:inline"></div>
          <div className="w-10 h-5 bg-gray-500 rounded-sm"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900">
        <div className="flex items-center space-x-4 min-w-min">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-500"></div>
          <div className="space-y-2">
            <div className="bg-gray-500 rounded-sm min-h-4 w-14 lg:w-64"></div>
            <div className="w-40 bg-gray-500 rounded-sm min-h-4"></div>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0 ">
          <div className="hidden w-40 h-5 bg-gray-500 rounded-sm md:inline"></div>
          <div className="w-10 h-5 bg-gray-500 rounded-sm"></div>
        </div>
      </div>
      <div className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900">
        <div className="flex items-center space-x-4 min-w-min">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-10 h-10 bg-gray-500"></div>
          <div className="space-y-2">
            <div className="bg-gray-500 rounded-sm min-h-4 w-14 lg:w-64"></div>
            <div className="w-40 bg-gray-500 rounded-sm min-h-4"></div>
          </div>
        </div>
        <div className="flex items-center justify-between ml-auto md:ml-0 ">
          <div className="hidden w-40 h-5 bg-gray-500 rounded-sm md:inline"></div>
          <div className="w-10 h-5 bg-gray-500 rounded-sm"></div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonTrack;
