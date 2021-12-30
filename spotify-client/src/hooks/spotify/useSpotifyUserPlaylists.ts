import { trpc } from "@/utils/trpc";

const useSpotifyUserPlaylists = () => {
  const queryPlaylists = trpc.useQuery(["playlists.user-playlists"], {
    staleTime: 60000,
  });

  return queryPlaylists;
};

export default useSpotifyUserPlaylists;
