import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useSpotifySelectedPlaylist } from "../hooks/spotify";
import Tracks from "./Tracks";
import UserHeader from "./UserHeader";
import { SkeletonHeaderSection, SkeletonTracks } from "./skeletons";

const colours = ["from-indigo-500", "from-blue-500", "from-purple-500"];
const defaultUserImage =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80";

const Center: React.FC = () => {
  const { isLoading, isIdle, isError, data: playlist, error } = useSpotifySelectedPlaylist();
  const { data: session } = useSession();
  const [colour, setColor] = useState<string | null>(null);

  useEffect(() => {
    setColor(shuffle(colours)[0]);
  }, [playlist]);

  const userImage = session?.user?.image ?? defaultUserImage;

  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <UserHeader
          name={session?.user?.name ?? ""}
          image={userImage}
          callback={signOut}
        />
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colour} h-80 text-white p-8`}
      >
        {isLoading || isIdle ? (
          <SkeletonHeaderSection />
        ) : (
          <>
            <img
              className="shadow-2xl h-44 w-44"
              src={playlist?.images[0].url}
            />
            <div>
              <p>PLAYLIST</p>
              <h2 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {playlist?.name}
              </h2>
            </div>
          </>
        )}
      </section>

      {isLoading || isIdle ? (
        <SkeletonTracks />
      ) : isError ? (
        <span>Error {error}</span>
      ) : (
        <>
          <Tracks tracks={playlist.tracks} />
        </>
      )}
    </div>
  );
}

export default Center;
