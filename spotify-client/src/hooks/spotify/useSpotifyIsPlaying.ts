import { trpc } from "@/utils/trpc";

function useSpotifyIsPlaying() {
  const queryIsPlaying = trpc.useQuery(["track.currently-playing"], {
    staleTime: 120, // Prevents immediate refetching as spotify API has delay
  });

  return queryIsPlaying;
}

export default useSpotifyIsPlaying;
