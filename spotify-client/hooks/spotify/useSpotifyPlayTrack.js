import { useCallback } from "react";
import { useMutation, useQueryClient } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyPlayTrack = () => {
  const { spotifyApi } = useSpotify();
  const queryClient = useQueryClient();

  const playSpotifyTrack = useCallback(
    async ({ trackUri }) => {
      const response = await spotifyApi.play({
        uris: [trackUri],
      });
      return response;
    },
    [spotifyApi]
  );

  const mutateSpotifyPlayTrack = useMutation(playSpotifyTrack, {
    onMutate: async ({ trackId }) => {
      // is playing state
      await queryClient.cancelQueries("isPlaying");
      const previousIsPlaying = queryClient.getQueryData("isPlaying");
      queryClient.setQueryData("isPlaying", () => true);

      // currently playing track id
      await queryClient.cancelQueries("currentlyPlayingTrackId");
      const previousCurrentlyPlayingTrackId = queryClient.getQueryData(
        "currentlyPlayingTrackId"
      );
      queryClient.setQueryData("currentlyPlayingTrackId", trackId);

      return { previousIsPlaying, previousCurrentlyPlayingTrackId };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("isPlaying", context.previousisPlaying);
      queryClient.setQueryData(
        "currentlyPlayingTrackId",
        context.previousCurrentlyPlayingTrackId == null
          ? null
          : context.previousCurrentlyPlayingTrackId
      );
      queryClient.invalidateQueries("currentlyPlayingTrackId");
    },
  });

  return mutateSpotifyPlayTrack;
};

export default useSpotifyPlayTrack;
