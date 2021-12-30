import useSpotify from "./useSpotify";
import { useQuery } from "react-query";
import { useCallback } from "react";

const useSpotifyUserPlaylists = () => {
  const { spotifyApi } = useSpotify();

  const fetchUserPlaylists = useCallback(async () => {
    const response = await spotifyApi.getUserPlaylists();
    return response.body.items;
  }, [spotifyApi]);

  const queryPlaylists = useQuery("playlists", fetchUserPlaylists, {
    staleTime: 60000,
  });

  return queryPlaylists;
};

export default useSpotifyUserPlaylists;
