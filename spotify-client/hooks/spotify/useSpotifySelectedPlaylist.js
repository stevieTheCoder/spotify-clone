import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "./useSpotify";
import { useQuery, useQueryClient } from "react-query";

const useSpotifySelectedPlaylist = () => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const { spotifyApi } = useSpotify();
  const queryClient = useQueryClient();

  // Fetch default playlist id if one has not been selected
  useEffect(() => {
    if (playlistId !== null) return;

    const fetchFeaturedPlaylistId = async () => {
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

    fetchFeaturedPlaylistId();
  }, [spotifyApi, playlistId]);

  const fetchPlaylist = async (id) => {
    const response = await spotifyApi.getPlaylist(id);
    return response.body;
  };

  // Fetch playlist for selected id
  const { isIdle, isLoading, isError, data, error } = useQuery(
    ["playlists", playlistId],
    () => fetchPlaylist(playlistId),
    {
      enabled: !!playlistId,
      staleTime: 60000,
    }
  );

  const prefetchPlaylist = async (idToPrefetch) => {
    await queryClient.prefetchQuery(
      ["playlists", idToPrefetch],
      () => fetchPlaylist(idToPrefetch),
      {
        staleTime: 60000,
      }
    );
  };

  return { isIdle, isLoading, isError, data, error, prefetchPlaylist };
};

export default useSpotifySelectedPlaylist;
