import { useCallback, useEffect, useState } from "react";
import useDebounce from "../useDebounce";
import { useSpotifyDevice } from ".";
import { inferQueryResponse, trpc } from "@/utils/trpc";
import { useQueryClient } from "react-query";

type ActiveDevice = inferQueryResponse<"device.active-device">;

interface Context {
  previousDevice: ActiveDevice;
}

const VOLUME_INCREMENT = 10;

export const useSpotifyDeviceVolume = () => {
  const queryClient = useQueryClient();

  const { data: activeDevice } = useSpotifyDevice();
  const [volume, setVolume] = useState(50);

  const volumeMutation = trpc.useMutation(["device.volume"], {
    onMutate: async ({ volume }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries("activeDevice");

      // Snapshot the previous value
      const previousDevice =
        queryClient.getQueryData<ActiveDevice>("activeDevice");

      // Optimistically update to the new value
      if (previousDevice) {
        queryClient.setQueryData<ActiveDevice>("activeDevice", {
          ...previousDevice,
          volume,
        });
      }

      return { previousDevice };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(
        "activeDevice",
        (context as Context).previousDevice
      );
    },
  });

  useDebounce(() => volumeMutation.mutate({ volume }), 500, [volume]);

  const activeDeviceVolume = activeDevice?.volume;

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

  const updateVolume = useCallback((newVolume: number) => {
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
