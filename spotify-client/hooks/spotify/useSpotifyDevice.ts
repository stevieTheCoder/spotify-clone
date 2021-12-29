import { trpc } from "../../lib/trpc";

const useSpotifyDevice = () => {
  return trpc.useQuery(["active-device"], { refetchInterval: 3000 });
};

export default useSpotifyDevice;
