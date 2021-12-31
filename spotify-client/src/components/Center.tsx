import { useSession, signOut } from "next-auth/react";
import { useSpotifySelectedPlaylist } from "../hooks/spotify";
import Tracks from "./Tracks";
import UserHeader from "./UserHeader";
import { SkeletonHeaderSection, SkeletonTracks } from "./skeletons";
import Image from "next/image";
import spotifyLogo from "/public/spotify.png";

const Center: React.FC = () => {
  const { data: playlist } = useSpotifySelectedPlaylist();
  const { data: session } = useSession();

  const userImage = session?.user?.image ?? spotifyLogo;

  return (
    <div className="relative flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <UserHeader
          name={session?.user?.name ?? ""}
          image={userImage}
          onClick={signOut}
        />
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black from-indigo-500 h-80 text-white p-8`}
      >
        {playlist ? (
          <>
            <div>
              <Image
                src={playlist.ImageSrc}
                width={176}
                height={176}
                alt="album art"
              />
            </div>
            <div>
              <p>PLAYLIST</p>
              <h2 className="text-2xl font-bold md:text-3xl xl:text-5xl">
                {playlist?.name}
              </h2>
            </div>
          </>
        ) : (
          <SkeletonHeaderSection />
        )}
      </section>

      {playlist?.tracks ? (
        <Tracks tracks={playlist.tracks} />
      ) : (
        <SkeletonTracks />
      )}
    </div>
  );
};

export default Center;
