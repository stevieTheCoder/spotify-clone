import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

export default function useSpotify() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) return;
    if (status === "loading") return;

    // If refresh access token fails, redirect user to login
    if (session.error === "RefreshAccessTokenError") {
      signIn();
    }

    spotifyApi.setAccessToken(session.accessToken);
  }, [session, status]);

  return { spotifyApi };
}

export const useSpotifyUserPlaylists = () => {
  const [userPlaylists, setUserPlaylists] = useState([]);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    if (!session) return;
    if (isLoading) return;

    spotifyApi.setAccessToken(session.accessToken);

    const fetchUserPlaylists = async () => {
      try {
        const response = await spotifyApi.getUserPlaylists();
        setUserPlaylists(response.body.items);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    };

    fetchUserPlaylists();
  }, [status, session, spotifyApi]);

  return userPlaylists;
};

export const useSpotifyPlaylist = () => {
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlist, setPlaylist] = useState(null);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    if (!session) return;
    if (isLoading) return;

    spotifyApi.setAccessToken(session.accessToken);

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
  }, [playlistId, status, spotifyApi]);

  return playlist;
};
