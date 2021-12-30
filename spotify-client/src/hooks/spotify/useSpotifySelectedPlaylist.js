import { useRecoilValue } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "./useSpotify";
import { useQuery } from "react-query";
import { useCallback } from "react";

const useSpotifySelectedPlaylist = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const { spotifyApi } = useSpotify();

  const fetchPlaylist = useCallback(
    async (id) => {
      const response = await spotifyApi.getPlaylist(id);
      return response.body;
    },
    [spotifyApi]
  );

  // Fetch playlist for selected id
  const queryPlaylist = useQuery(
    ["playlists", playlistId],
    () => fetchPlaylist(playlistId),
    {
      enabled: !!playlistId,
      staleTime: 60000,
    }
  );

  return queryPlaylist;
};

export default useSpotifySelectedPlaylist;
