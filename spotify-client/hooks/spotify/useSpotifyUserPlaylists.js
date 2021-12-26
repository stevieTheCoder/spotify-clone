import useSpotify from "./useSpotify";
import { useQuery } from "react-query";

const useSpotifyUserPlaylists = () => {
  const { spotifyApi } = useSpotify();

  const fetchUserPlaylists = async () => {
    const response = await spotifyApi.getUserPlaylists();
    return response.body.items;
  };

  const { isIdle, isLoading, isError, data, error } = useQuery(
    "playlists",
    fetchUserPlaylists,
    {
      staleTime: 60000,
    }
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifyUserPlaylists;
