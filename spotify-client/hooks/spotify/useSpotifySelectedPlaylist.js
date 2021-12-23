import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../../atoms/playlistAtom";
import useSpotify from "./useSpotify";

const useSpotifySelectedPlaylist = () => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useState(null);
  const { spotifyApi, isAuthenticated } = useSpotify();

  useEffect(() => {
    if (!isAuthenticated) return;

    if (playlistId === null) {
      const fetchPlaylistId = async () => {
        try {
          const response = await spotifyApi.getFeaturedPlaylists({
            limit: 1,
            offset: 0,
            country: "GB",
          });
          setPlaylistId(response.body.playlists.items[0].id);
        } catch (err) {
          console.log("Something went wrong!", err);
        }
      };

      fetchPlaylistId();
    }

    // Fetch playlist
    if (playlistId !== null) {
      const fetchPlaylist = async (id) => {
        try {
          const response = await spotifyApi.getPlaylist(id);
          setPlaylist(response.body);
        } catch (err) {
          console.log("Something went wrong!", err);
        }
      };

      fetchPlaylist(playlistId);
    }
  }, [playlistId, spotifyApi, isAuthenticated]);

  return playlist;
};

export default useSpotifySelectedPlaylist;
