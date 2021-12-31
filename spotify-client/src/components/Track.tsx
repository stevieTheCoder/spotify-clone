import {
  useSpotifyPlayTrack,
  useSpotifyPrefetchTrackInfo,
} from "../hooks/spotify";
import millisecondsToMinutesAndSeconds from "../utils/time";
import useLongHover from "../hooks/useLongHover";
import { useRef } from "react";
import { inferQueryResponse } from "@/utils/trpc";
import Image from "next/image";

type TrackFromServer = inferQueryResponse<"playlists.playlist-by-id">;
type TrackType = TrackFromServer["tracks"][0];

type Props = {
  order: number;
  track: TrackType;
};

const Track: React.FC<Props> = ({ order, track }) => {
  const elementRef = useRef(null);
  const { mutate: playSpotifyTrack } = useSpotifyPlayTrack();
  const prefetchTrackInfo = useSpotifyPrefetchTrackInfo();
  useLongHover(elementRef, async () => await prefetchTrackInfo(track.id));

  return (
    <div
      ref={elementRef}
      className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900"
      onClick={() =>
        playSpotifyTrack({ trackId: track.id, trackUri: track.uri })
      }
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <div>
          <Image
            height={40}
            width={40}
            src={track.albumImageSrc}
            alt="album art"
          />
        </div>
        <div>
          <p className="text-white truncate w-36 lg:w-64">{track.name}</p>
          <p className="w-40">{track.artistName}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0 ">
        <p className="hidden w-40 md:inline">{track.albumName}</p>
        <p>{millisecondsToMinutesAndSeconds(track.duration)}</p>
      </div>
    </div>
  );
};

export default Track;
