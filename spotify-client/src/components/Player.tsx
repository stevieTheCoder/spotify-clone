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
import Image from "next/image";

import {
  useSpotifyTogglePlayPause,
  useSpotifyTrackInfo,
  useSpotifyDeviceVolume,
} from "../hooks/spotify";
import ActivateDevice from "./ActivateDevice";

import PlayerButton from "./PlayerButton";
import SkeletonPlayerTrackInfo from "./skeletons/SkeletonPlayerTrackInfo";

const Player: React.FC = () => {
  const { isLoading, isIdle, data: trackInfo } = useSpotifyTrackInfo();

  const { togglePlayPause, isPlaying } = useSpotifyTogglePlayPause();

  const {
    enabled: volumeEnabled,
    volume,
    incrementVolume,
    decrementVolume,
    updateVolume,
  } = useSpotifyDeviceVolume();

  return (
    <div className="px-6 py-4 bg-gradient-to-b from-black to-gray-900">
      <div className="flex justify-center py-2">
        <ActivateDevice />
      </div>

      <div className="flex flex-col justify-between text-xs text-white md:min-h-24 md:grid md:grid-cols-3 md:text-base">
        {/*Active Device Notification*/}

        {/*Left */}
        {trackInfo ? (
          <div className="flex items-center pt-2 space-x-4 md:pt-0">
            <div className="w-10 h-10">
              <Image
                src={trackInfo.albumImageSrc}
                alt="album art"
                width={40}
                height={40}
              />
            </div>
            <div>
              <h3>{trackInfo.name}</h3>
              <p className="text-gray-500">{trackInfo.artist}</p>
            </div>
          </div>
        ) : isIdle ? (
          <div />
        ) : (
          isLoading && <SkeletonPlayerTrackInfo />
        )}

        {/*Center */}
        <div className="flex items-center justify-evenly">
          <PlayerButton>
            <SwitchHorizontalIcon />
          </PlayerButton>
          <PlayerButton>
            <RewindIcon />
          </PlayerButton>
          <PlayerButton size={10} onClick={() => togglePlayPause()}>
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
        <div className="flex items-center justify-center pt-2 space-x-2 md:justify-end md:space-x-4 md:pt-0">
          <PlayerButton onClick={decrementVolume}>
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
          <PlayerButton onClick={incrementVolume}>
            <VolumeUpIcon />
          </PlayerButton>
        </div>
      </div>
    </div>
  );
};

export default Player;
