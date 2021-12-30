import useSpotify from "./useSpotify";
import {
  MutationFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "react-query";
import { useSpotifyIsPlaying } from ".";
import { useCallback } from "react";

const useSpotifyTogglePlayPause = () => {
  const { spotifyApi } = useSpotify();
  const { data: isPlaying } = useSpotifyIsPlaying();
  const queryClient = useQueryClient();

  const playCurrentTrack = useCallback(async () => {
    return await spotifyApi.play();
  }, [spotifyApi]);

  const pauseCurrentTrack = useCallback(async () => {
    return await spotifyApi.pause();
  }, [spotifyApi]);

  const functionToRun = isPlaying ? pauseCurrentTrack : playCurrentTrack;

  const mutation = useMutation(functionToRun, {
    onMutate: async () => {
      await queryClient.cancelQueries("isPlaying");

      const previousisPlaying = queryClient.getQueryData<string>("isPlaying");

      queryClient.setQueryData("isPlaying", (old) => !old);

      return { previousisPlaying };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousisPlaying) {
        queryClient.setQueryData("isPlaying", context.previousisPlaying);
      }
    },
  });

  return { mutation, isPlaying };
};

export default useSpotifyTogglePlayPause;
