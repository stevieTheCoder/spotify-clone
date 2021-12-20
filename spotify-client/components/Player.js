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
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isPlayingState } from "../atoms/songAtom";
import {
  useSpotifyTogglePlayPause,
  useSpotifyTrackInfo,
  useSpotifyVolume,
} from "../hooks/useSpotify";
import PlayerButton from "./PlayerButton";

const VOLUME_INCREMENT = 10;

function Player() {
  const [volume, setVolume] = useState(100);
  const trackInfo = useSpotifyTrackInfo();
  const isPlaying = useRecoilValue(isPlayingState);
  const { togglePlayPause } = useSpotifyTogglePlayPause();
  const { setSpotifyVolume, isAuthenticated } = useSpotifyVolume();

  useEffect(() => {
    if (!isAuthenticated) return;
    debounceSetVolume(volume);
  }, [volume, isAuthenticated]);

  const debounceSetVolume = useCallback(
    debounce(async (value) => {
      await setSpotifyVolume(value);
    }, 500),
    []
  );

  return (
    <div className="grid h-24 grid-cols-3 px-2 text-xs text-white bg-gradient-to-b from-black to-gray-900 md:text-base md:px-8">
      {/*Left */}
      <div className="flex items-center space-x-4">
        {trackInfo && (
          <>
            <img
              className="hidden w-10 h-10 md:inline"
              src={trackInfo?.album.images?.[0]?.url}
              alt="album art"
            />
            <div>
              <h3>{trackInfo?.name}</h3>
              <p>{trackInfo?.artists?.[0]?.name}</p>
            </div>
          </>
        )}
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

      {/* Right */}
      <div className="flex items-center justify-end space-x-3 md:space-x-4">
        <PlayerButton
          callback={() =>
            volume > 0 && setVolume((cur) => cur - VOLUME_INCREMENT)
          }
        >
          <VolumeDownIcon />
        </PlayerButton>
        <input
          className="w-14 md:w-28"
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
