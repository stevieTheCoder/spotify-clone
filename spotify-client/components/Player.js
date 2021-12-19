import {
  VolumeUpIcon as VolumeDownIcon,
  HeartIcon,
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
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isPlayingState } from "../atoms/songAtom";
import {
  useSpotifyTogglePlayPause,
  useSpotifyTrackInfo,
} from "../hooks/useSpotify";
import PlayerButton from "./PlayerButton";

function Player() {
  const [volume, setVolume] = useState(50);
  const trackInfo = useSpotifyTrackInfo();
  const isPlaying = useRecoilValue(isPlayingState);
  const { togglePlayPause } = useSpotifyTogglePlayPause();

  return (
    <div className="grid h-24 grid-cols-3 px-2 text-xs text-white bg-gradient-to-b from-black to-gray-900 md:text-base md:px-8">
      {/*Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden w-10 h-10 md:inline"
          src={trackInfo?.album.images?.[0]?.url}
          alt="album art"
        />
        <div>
          <h3>{trackInfo?.name}</h3>
          <p>{trackInfo?.artists?.[0]?.name}</p>
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
        <PlayerButton size="10" callback={togglePlayPause}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </PlayerButton>
        <PlayerButton>
          <FastForwardIcon />
        </PlayerButton>
        <PlayerButton>
          <ReplyIcon />
        </PlayerButton>
      </div>
    </div>
  );
}

export default Player;
