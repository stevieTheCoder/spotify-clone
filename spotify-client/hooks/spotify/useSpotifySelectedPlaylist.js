import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "./useSpotify";
import { useQuery } from "react-query";

const useSpotifySelectedPlaylist = () => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const { spotifyApi, isAuthenticated } = useSpotify();

  // Fetch default playlist id if one has not been selected
  useEffect(() => {
    if (!isAuthenticated) return;
    if (playlistId !== null) return;

    const fetchPlaylistId = async () => {
      try {
        const response = await spotifyApi.getFeaturedPlaylists({
          limit: 1,
          offset: 0,
          country: "GB",
        });
        setPlaylistId(response.body.playlists.items[0].id);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    };

    fetchPlaylistId();
  }, [spotifyApi, playlistId, isAuthenticated]);

  const fetchPlaylist = async (id) => {
    const response = await spotifyApi.getPlaylist(id);
    return response.body;
  };

  // Fetch playlist for selected id
  const { isIdle, isLoading, isError, data, error } = useQuery(
    ["playlists", playlistId],
    () => fetchPlaylist(playlistId),
    {
      enabled: isAuthenticated && !!playlistId,
      staleTime: 600000,
    }
  );

  return { isIdle, isLoading, isError, data, error };
};

export default useSpotifySelectedPlaylist;
