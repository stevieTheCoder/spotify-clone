import { useRecoilValue } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import { trpc } from "@/utils/trpc";

const useSpotifySelectedPlaylist = () => {
  const playlistId = useRecoilValue(playlistIdState);
  const utils = trpc.useContext();

  // Fetch playlist for selected id
  const queryPlaylist = trpc.useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ["playlists.playlist-by-id", { playlistId: playlistId! }],
    {
      enabled: !!playlistId,
      staleTime: 60000,
      onSuccess: (playlist) => {
        // Preset track information from playlist info to save duplicate query
        playlist.tracks.forEach((t) => {
          utils.setQueryData(["track.track-info", { trackId: t.id }], {
            id: t.id,
            albumImageSrc: t.albumImageSrc,
            artist: t.artistName,
            name: t.name,
          });
        });
      },
    }
  );

  return queryPlaylist;
};

export default useSpotifySelectedPlaylist;
