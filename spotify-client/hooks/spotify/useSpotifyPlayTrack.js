import { useMutation, useQueryClient } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyPlayTrack = () => {
  const { spotifyApi } = useSpotify();
  const queryClient = useQueryClient();

  const playSpotifyTrack = async (trackUri) => {
    return await spotifyApi.play({
      uris: [trackUri],
    });
  };

  const mutation = useMutation(playSpotifyTrack, {
    onMutate: async () => {
      await queryClient.cancelQueries("isPlaying");

      const previousisPlaying = queryClient.getQueryData("isPlaying");

      queryClient.setQueryData("isPlaying", true);

      return { previousisPlaying };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("isPlaying", context.previousisPlaying);
    },
  });

  return { mutation };
};

export default useSpotifyPlayTrack;
