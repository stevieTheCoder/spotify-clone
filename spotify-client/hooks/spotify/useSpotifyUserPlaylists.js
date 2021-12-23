import useSpotify from "./useSpotify";
import { useQuery } from "react-query";
import { useCallback } from "react";

const useSpotifyUserPlaylists = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();

  const fetchUserPlaylists = useCallback(async () => {
    const response = await spotifyApi.getUserPlaylists();
    return response.body.items;
  }, [spotifyApi]);

  const { isIdle, isLoading, isError, data, error } = useQuery(
    "playlists",
    fetchUserPlaylists,
    {
      enabled: isAuthenticated,
      staleTime: 600000, // 10 minutes
    }
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifyUserPlaylists;
