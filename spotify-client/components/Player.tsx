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
  useSpotifyDeviceVolume,
} from "../hooks/spotify";
import ActivateDevice from "./ActivateDevice";

import PlayerButton from "./PlayerButton";
import SkeletonPlayerTrackInfo from "./skeletons/SkeletonPlayerTrackInfo";

const Player: React.FC = () => {
  const {
    isIdle,
    isLoading,
    isError,
    data: trackInfo,
    error,
  } = useSpotifyTrackInfo();

  const [{mutate: togglePlayPause}, isPlaying]= useSpotifyTogglePlayPause();

  const {
    enabled: volumeEnabled,
    volume,
    incrementVolume,
    decrementVolume,
    updateVolume,
  } = useSpotifyDeviceVolume();

  return (
    <div className="relative flex flex-col justify-between px-6 py-4 text-xs text-white min-h-44 md:min-h-24 md:grid md:grid-cols-3 bg-gradient-to-b from-black to-gray-900 md:text-base">
      {/*Active Device Notification*/}
      <div className="absolute transform -translate-x-1/2 left-1/2 top-1">
        <ActivateDevice />
      </div>

      {/*Left */}
      {isLoading ? (
        <SkeletonPlayerTrackInfo />
      ) : isIdle ? (
        <div />
      ) : isError ? (
        <div>Error {error}</div>
      ) : (
        <div className="flex items-center pt-2 space-x-4 md:pt-0">
          <img className="w-10 h-10" src={trackInfo?.albumSrc} alt="album art" />
          <div>
            <h3>{trackInfo?.name}</h3>
            <p className="text-gray-500">{trackInfo?.artist}</p>
          </div>
        </div>
      )}

      {/*Center */}
      <div className="flex items-center justify-evenly">
        <PlayerButton>
          <SwitchHorizontalIcon />
        </PlayerButton>
        <PlayerButton>
          <RewindIcon />
        </PlayerButton>
        <PlayerButton
          size={10}
          callback={() => togglePlayPause()}
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
        <PlayerButton callback={decrementVolume}>
          <VolumeDownIcon />
        </PlayerButton>
        <input
          className="w-full max-w-xs border-cyan-50 md:w-min"
          type="range"
          value={volume}
          min={0}
          max={100}
          onChange={(e) => updateVolume(Number(e.target.value))}
          disabled={!volumeEnabled}
        />
        <PlayerButton callback={incrementVolume}>
          <VolumeUpIcon />
        </PlayerButton>
      </div>
    </div>
  );
}

export default Player;
