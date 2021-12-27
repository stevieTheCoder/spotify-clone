import { useQuery } from "react-query";
import useSpotify from "./useSpotify";

const useSpotifyDevices = () => {
  const { spotifyApi } = useSpotify();

  const fetchDevices = async () => {
    const response = await spotifyApi.getMyDevices();
    return response.body.devices;
  };

  const query = useQuery("devices", fetchDevices);

  return query;
};

export default useSpotifyDevices;
