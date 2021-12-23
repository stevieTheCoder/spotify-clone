import useSpotify from "./useSpotify";
import { useQuery } from "react-query";

const useSpotifyUserPlaylists = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();

  const fetchUserPlaylists = async () => {
    const response = await spotifyApi.getUserPlaylists();
    return response.body.items;
  };

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
