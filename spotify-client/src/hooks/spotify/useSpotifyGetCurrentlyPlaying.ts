import { trpc } from "@/utils/trpc";

const useSpotifyGetCurrentlyPlaying = () => {
  return trpc.useQuery(["track.currently-playing-id"]);
};

export default useSpotifyGetCurrentlyPlaying;
