import { useSpotifyPlayTrack, useSpotifyTrackInfo } from "../hooks/spotify";
import millisecondsToMinutesAndSeconds from "../lib/time";
import useLongHover from "../hooks/useLongHover";
import { useRef } from "react";

function Track({ order, track }) {
  const elementRef = useRef();
  const { mutation: playSpotifyTrack } = useSpotifyPlayTrack();
  const { prefetchTrackInfo } = useSpotifyTrackInfo();
  useLongHover(elementRef, async () => await prefetchTrackInfo(track.id));

  return (
    <div
      ref={elementRef}
      className="grid grid-cols-2 px-5 py-4 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-900"
      onClick={() =>
        playSpotifyTrack.mutate({ trackId: track.id, trackUri: track.uri })
      }
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          className="w-10 h-10"
          src={track?.album.images[0]?.url}
          alt="album art"
        />
        <div>
          <p className="text-white truncate w-36 lg:w-64">{track.name}</p>
          <p className="w-40">{track.artists[0].name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0 ">
        <p className="hidden w-40 md:inline">{track?.album.name}</p>
        <p>{millisecondsToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
}

export default Track;
