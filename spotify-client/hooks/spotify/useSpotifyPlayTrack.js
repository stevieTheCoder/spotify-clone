import { useMutation, useQueryClient } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyPlayTrack = () => {
  const { spotifyApi } = useSpotify();
  const queryClient = useQueryClient();

  const playSpotifyTrack = async ({ trackUri }) => {
    const response = await spotifyApi.play({
      uris: [trackUri],
    });
    return response;
  };

  const mutation = useMutation(playSpotifyTrack, {
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

  return { mutation };
};

export default useSpotifyPlayTrack;
