import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyDevices = () => {
  const { spotifyApi } = useSpotify();

  const fetchDevices = async () => {
    const response = await spotifyApi.getMyDevices();
    return response.body.devices;
  };

  const query = useQuery("devices", fetchDevices, {
    staleTime: 60000,
  });

  return query;
};

export default useSpotifyDevices;
