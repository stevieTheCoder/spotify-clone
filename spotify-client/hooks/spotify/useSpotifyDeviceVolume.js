import { useCallback, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import useSpotify from "./useSpotify";
import useDebounce from "../useDebounce";
import { useSpotifyDevice } from ".";

const VOLUME_INCREMENT = 10;

export const useSpotifyDeviceVolume = () => {
  const { spotifyApi } = useSpotify();
  const queryClient = useQueryClient();
  const { data: activeDevice } = useSpotifyDevice();
  const [volume, setVolume] = useState(50);

  const volumeMutation = useMutation(
    (volumePercent) => {
      return spotifyApi.setVolume(volumePercent);
    },
    {
      onMutate: async (volumePercent) => {
        await queryClient.cancelQueries("activeDevice");
        const previousDevice = queryClient.getQueryData("activeDevice");
        queryClient.setQueryData("activeDevice", (old) => ({
          ...old,
          volume_percent: volumePercent,
        }));

        return { previousDevice };
      },
      onError: (_err, _volumePercent, context) => {
        queryClient.setQueryData("activeDevice", context.previousDevice);
      },
    }
  );

  useDebounce(() => volumeMutation.mutate(volume), 500, [volume]);

  const activeDeviceVolume = activeDevice?.volume_percent;

  useEffect(() => {
    if (activeDeviceVolume == null) return;
    setVolume(activeDeviceVolume);
  }, [activeDeviceVolume]);

  const incrementVolume = useCallback(() => {
    volume < 100 && setVolume((cur) => cur + VOLUME_INCREMENT);
  }, [volume]);

  const decrementVolume = useCallback(() => {
    volume > 0 && setVolume((cur) => cur - VOLUME_INCREMENT);
  }, [volume]);

  const updateVolume = useCallback((newVolume) => {
    setVolume(newVolume);
  }, []);

  return {
    enabled: !!activeDeviceVolume,
    volume,
    incrementVolume,
    decrementVolume,
    updateVolume,
  };
};

export default useSpotifyDeviceVolume;
