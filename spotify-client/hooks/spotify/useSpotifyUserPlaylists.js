import { useEffect, useState } from "react";
import useSpotify from "./useSpotify";

const useSpotifyUserPlaylists = () => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const { spotifyApi, isAuthenticated } = useSpotify();

  useEffect(() => {
    if (!isAuthenticated) return;
    const fetchUserPlaylists = async () => {
      try {
        const response = await spotifyApi.getUserPlaylists();
        setUserPlaylists(response.body.items);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    };

    fetchUserPlaylists();
  }, [spotifyApi, isAuthenticated]);

  return userPlaylists;
};

export default useSpotifyUserPlaylists;
