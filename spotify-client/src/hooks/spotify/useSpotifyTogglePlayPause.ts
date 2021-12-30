import { inferQueryResponse, trpc } from "@/utils/trpc";
import { useCallback } from "react";
import { useSpotifyIsPlaying } from ".";

type CurrentlyPlaying = inferQueryResponse<"device.current-playback-state">;

interface Context {
  previousIsPlaying: CurrentlyPlaying;
}

const useSpotifyTogglePlayPause = () => {
  const { data: playingState } = useSpotifyIsPlaying();
  const utils = trpc.useContext();

  const playMutation = trpc.useMutation(["device.play"], {
    onMutate: async () => {
      await utils.cancelQuery(["device.current-playback-state"]);

      const previousIsPlaying = utils.getQueryData([
        "device.current-playback-state",
      ]);

      utils.setQueryData(["device.current-playback-state"], {
        isPlaying: true,
      });

      return { previousIsPlaying };
    },
    onError: (_error, _variables, context) => {
      const c = context as Context;
      utils.setQueryData(
        ["device.current-playback-state"],
        c.previousIsPlaying
      );
    },
  });

  const pauseMutation = trpc.useMutation(["device.pause"], {
    onMutate: async () => {
      await utils.cancelQuery(["device.current-playback-state"]);

      const previousIsPlaying = utils.getQueryData([
        "device.current-playback-state",
      ]);

      if (previousIsPlaying) {
        utils.setQueryData(["device.current-playback-state"], {
          isPlaying: false,
        });
      }
      return { previousIsPlaying };
    },
    onError: (_error, _variables, context) => {
      const c = context as Context;
      utils.setQueryData(
        ["device.current-playback-state"],
        c.previousIsPlaying
      );
    },
  });

  const togglePlayPause = useCallback(() => {
    if (playingState?.isPlaying) {
      pauseMutation.mutate();
      return;
    }
    playMutation.mutate();
  }, [pauseMutation, playMutation, playingState?.isPlaying]);

  return { togglePlayPause, isPlaying: playingState?.isPlaying };
};

export default useSpotifyTogglePlayPause;
