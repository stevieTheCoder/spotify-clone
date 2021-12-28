import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyDevice = () => {
  const { spotifyApi } = useSpotify();

  const fetchDevices = async () => {
    const response = await spotifyApi.getMyDevices();
    return response.body.devices.find((device) => device.is_active);
  };

  const query = useQuery("activeDevice", fetchDevices, {
    refetchInterval: 3000,
  });

  return query;
};

export default useSpotifyDevice;
