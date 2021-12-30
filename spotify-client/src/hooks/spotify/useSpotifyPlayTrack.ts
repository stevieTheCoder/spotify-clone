import { inferQueryResponse, trpc } from "@/utils/trpc";

type IsPlaying = inferQueryResponse<"device.current-playback-state">;
type CurrentlyPlayingTrackId = inferQueryResponse<"track.currently-playing-id">;

interface Context {
  previousIsPlaying: IsPlaying;
  previousCurrentlyPlayingTrackId: CurrentlyPlayingTrackId;
}

const useSpotifyPlayTrack = () => {
  const utils = trpc.useContext();

  const mutateSpotifyPlayTrack = trpc.useMutation(["track.play"], {
    onMutate: async ({ trackId }) => {
      // Cancel any outgoing queries
      await utils.cancelQuery(["device.current-playback-state"]);

      // Snapshot the previous value
      const previousIsPlaying = utils.getQueryData([
        "device.current-playback-state",
      ]);

      // Optimitically update to the new value
      utils.setQueryData(["device.current-playback-state"], {
        isPlaying: true,
      });

      // Cancel any outgoing queries
      await utils.cancelQuery(["track.currently-playing-id"]);

      // Snapshot the previous value
      const previousCurrentlyPlayingTrackId = utils.getQueryData([
        "track.currently-playing-id",
      ]);

      // Optimistically update to the new value
      utils.setQueryData(["track.currently-playing-id"], { trackId });

      return { previousIsPlaying, previousCurrentlyPlayingTrackId };
    },
    onError: (_err, _newTodo, context) => {
      const c = context as Context;

      utils.setQueryData(["device.current-playback-state"], {
        isPlaying: c.previousIsPlaying.isPlaying,
      });

      utils.setQueryData(["track.currently-playing-id"], {
        trackId: c.previousCurrentlyPlayingTrackId.trackId,
      });
    },
    onSettled: () => {
      utils.invalidateQueries(["track.currently-playing-id"]);
    },
  });

  return mutateSpotifyPlayTrack;
};

export default useSpotifyPlayTrack;
