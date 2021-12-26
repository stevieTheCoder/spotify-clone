import { useRecoilValue } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "./useSpotify";
import { useQuery, useQueryClient } from "react-query";

const useSpotifySelectedPlaylist = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const { spotifyApi } = useSpotify();
  const queryClient = useQueryClient();

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
