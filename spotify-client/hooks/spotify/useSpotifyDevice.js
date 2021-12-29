import { useQuery } from "react-query";

const useSpotifyDevice = () => {
  const queryActiveDevice = useQuery(
    "activeDevice",
    async () => {
      const response = await fetch("/api/spotify/active-device");
      if (!response.ok) {
        throw new Error("Active device error");
      }
      return response.json();
    },
    {
      refetchInterval: 3000,
    }
  );

  return queryActiveDevice;
};

export default useSpotifyDevice;
