import { trpc } from "@/utils/trpc";

const useSpotifyGetCurrentlyPlaying = () => {
  return trpc.useQuery(["track.currently-playing"]);
};

export default useSpotifyGetCurrentlyPlaying;
