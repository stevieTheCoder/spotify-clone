import { useRecoilValue } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import { trpc } from "@/utils/trpc";

const useSpotifySelectedPlaylist = () => {
  const playlistId = useRecoilValue(playlistIdState);

  // Fetch playlist for selected id
  const queryPlaylist = trpc.useQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    ["playlists.playlist-by-id", { playlistId: playlistId! }],
    {
      enabled: !!playlistId,
      staleTime: 60000,
    }
  );

  return queryPlaylist;
};

export default useSpotifySelectedPlaylist;
