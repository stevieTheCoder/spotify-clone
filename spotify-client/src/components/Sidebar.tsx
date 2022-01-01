import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";

import { useSpotifyUserPlaylists } from "../hooks/spotify";
import PlaylistName from "./PlaylistName";
import { SkeletonSideBar } from "./skeletons";

const Sidebar: React.FC = () => {
  const {
    isLoading,
    isIdle,
    isError,
    data: userPlaylists,
    error,
  } = useSpotifyUserPlaylists();

  return (
    <div className="hidden p-5 mb-24 overflow-y-scroll text-xs text-gray-500 border-r border-gray-900 lg:col-span-2 md:col-span-3 md:block lg:text-sm scrollbar-hide">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="w-5 h-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <SearchIcon className="w-5 h-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="w-5 h-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-gray-900 border-t-thin" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="w-5 h-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="w-5 h-5" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <RssIcon className="w-5 h-5" />
          <p>Your Eposiodes</p>
        </button>
        <hr className="border-gray-900 border-t-thin" />

        {isLoading || isIdle ? (
          <SkeletonSideBar />
        ) : isError ? (
          <span>Error {error}</span>
        ) : (
          userPlaylists?.map((playlist) => {
            return (
              <PlaylistName
                key={playlist.id}
                id={playlist.id}
                name={playlist.name}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Sidebar;
