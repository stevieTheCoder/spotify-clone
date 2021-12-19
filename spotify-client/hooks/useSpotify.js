import { useSession, signIn } from "next-auth/react";
import SpotifyWebApi from "spotify-web-api-node";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtom";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isAuthenticated) return;

    // If refresh access token fails, redirect user to login
    if (session.error === "RefreshAccessTokenError") {
      signIn();
    }

    spotifyApi.setAccessToken(session.accessToken);
  }, [session, isAuthenticated]);

  return { spotifyApi, isAuthenticated };
};

export const usePlaySpotifyTrack = () => {
  const { spotifyApi } = useSpotify();
  const [, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [, setIsPlaying] = useRecoilState(isPlayingState);

  const playSpotifyTrack = async (trackId, trackUri) => {
    setCurrentTrackId(trackId);
    setIsPlaying(true);
    await spotifyApi.play({
      uris: [trackUri],
    });
  };

  return { playSpotifyTrack };
};

export const useSpotifyUserPlaylists = () => {
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

export const useSpotifyPlaylist = () => {
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
