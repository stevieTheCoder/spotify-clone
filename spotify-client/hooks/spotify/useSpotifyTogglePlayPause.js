import useSpotify from "./useSpotify";
import { useMutation, useQueryClient } from "react-query";
import { useSpotifyIsPlaying } from ".";

const useSpotifyTogglePlayPause = () => {
  const { spotifyApi } = useSpotify();
  const { data: isPlaying } = useSpotifyIsPlaying();
  const queryClient = useQueryClient();

  const playCurrentTrack = async () => {
    return await spotifyApi.play();
  };

  const pauseCurrentTrack = async () => {
    spotifyApi.pause();
  };

  const functionToRun = isPlaying ? pauseCurrentTrack : playCurrentTrack;

  const mutation = useMutation(functionToRun, {
    onMutate: async () => {
      await queryClient.cancelQueries("isPlaying");

      const previousisPlaying = queryClient.getQueryData("isPlaying");

      queryClient.setQueryData("isPlaying", (old) => !old);

      return { previousisPlaying };
    },
    onError: (_err, _newTodo, context) => {
      queryClient.setQueryData("isPlaying", context.previousisPlaying);
    },
  });

  return { isPlaying, mutation };
};

export default useSpotifyTogglePlayPause;
