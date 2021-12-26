import {
  VolumeUpIcon as VolumeDownIcon,
  ReplyIcon,
} from "@heroicons/react/outline";
import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";

import {
  useSpotifyTogglePlayPause,
  useSpotifyTrackInfo,
  useSpotifyVolume,
  useSpotifyIsPlaying,
} from "../hooks/spotify";
import PlayerButton from "./PlayerButton";

const VOLUME_INCREMENT = 10;

function Player() {
  const {
    isIdle,
    isLoading,
    isError,
    data: trackInfo,
    error,
  } = useSpotifyTrackInfo();

  // TODO erroring possibly because refetch is null
  const { data: isPlaying } = useSpotifyIsPlaying();
  const { mutation: togglePlayPause } = useSpotifyTogglePlayPause();
  const [volume, setVolume] = useSpotifyVolume();

  if (isLoading || isIdle) return <span>Loading...</span>;

  if (isError) return <span>Error {error}</span>;

  return (
    <div className="flex flex-col justify-between px-6 py-4 text-xs text-white min-h-44 md:min-h-24 md:grid md:grid-cols-3 bg-gradient-to-b from-black to-gray-900 md:text-base">
      {/*Left */}
      <div className="flex items-center pt-2 space-x-4 md:pt-0">
        <img
          className="w-10 h-10"
          src={trackInfo.album.images[0].url}
          alt="album art"
        />
        <div>
          <h3>{trackInfo.name}</h3>
          <p className="text-gray-500">{trackInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/*Center */}
      <div className="flex items-center justify-evenly">
        <PlayerButton>
          <SwitchHorizontalIcon />
        </PlayerButton>
        <PlayerButton>
          <RewindIcon />
        </PlayerButton>
        <PlayerButton
          size="10"
          callback={() => togglePlayPause.mutate({ isPlaying })}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </PlayerButton>
        <PlayerButton>
          <FastForwardIcon />
        </PlayerButton>
        <PlayerButton>
          <ReplyIcon />
        </PlayerButton>
      </div>

      {/* Right */}
      <div className="flex items-center justify-center space-x-2 md:justify-end md:space-x-4">
        <PlayerButton
          callback={() =>
            volume > 0 && setVolume((cur) => cur - VOLUME_INCREMENT)
          }
        >
          <VolumeDownIcon />
        </PlayerButton>
        <input
          className="w-full max-w-xs border-cyan-50 md:w-min"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <PlayerButton
          callback={() =>
            volume < 100 && setVolume((cur) => cur + VOLUME_INCREMENT)
          }
        >
          <VolumeUpIcon />
        </PlayerButton>
      </div>
    </div>
  );
}

export default Player;
