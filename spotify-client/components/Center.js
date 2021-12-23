import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { useSpotifySelectedPlaylist } from "../hooks/spotify";
import Tracks from "./Tracks";

const colours = ["from-indigo-500", "from-blue-500", "from-purple-500"];

export default function Center() {
  const playlist = useSpotifySelectedPlaylist();
  const { data: session } = useSession();
  const [colour, setColor] = useState(null);
  const playlistId = useRecoilValue(playlistIdState);

  useEffect(() => {
    setColor(shuffle(colours)[0]);
  }, [playlistId]);

  const image =
    session?.user?.image ??
    "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80";

  if (playlist === null) return <div></div>;

  return (
    <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center p-1 pr-2 space-x-3 text-white bg-black rounded-full cursor-pointer opacity-90 hover:opacity-80"
          onClick={signOut}
        >
          <img
            src={image}
            className="object-cover w-10 h-10 rounded-full"
            alt="user image"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </header>

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${colour} h-80 text-white p-8`}
      >
        <img className="shadow-2xl h-44 w-44" src={playlist?.images?.[0].url} />
        <div>
          <p>PLAYLIST</p>
          <h2 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h2>
        </div>
      </section>

      <div>{playlist ? <Tracks playlist={playlist} /> : <p>Loading...</p>}</div>
    </div>
  );
}
