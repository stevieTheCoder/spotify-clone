import { trpc } from "@/utils/trpc";

const useSpotifyDevice = () => {
  return trpc.useQuery(["device.active-device"], { refetchInterval: 3000 });
};

export default useSpotifyDevice;
