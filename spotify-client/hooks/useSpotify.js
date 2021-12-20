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

export const useSpotifyVolume = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();

  const setSpotifyVolume = async (volume) => {
    try {
      await spotifyApi.setVolume(volume);
    } catch (err) {
      console.log("Something went wrong!", err);
    }
  };

  return { setSpotifyVolume, isAuthenticated };
};

export const useSpotifyTrackInfo = () => {
  const { spotifyApi, isAuthenticated } = useSpotify();
  const [currentTrackId, setCurrentTrackId] =
    useRecoilState(currentTrackIdState);
  const [, setIsPlaying] = useRecoilState(isPlayingState);
  const [trackInfo, setTrackInfo] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (!currentTrackId) {
      const fetchCurrentPlayingTrack = async () => {
        try {
          const response = await spotifyApi.getMyCurrentPlayingTrack();
          setCurrentTrackId(response.body?.item.id);
        } catch (err) {
          console.log("Something went wrong!", err);
        }
      };

      fetchCurrentPlayingTrack();
    }

    if (currentTrackId) {
      const fetchTrackInfo = async () => {
        try {
          const response = await spotifyApi.getTrack(currentTrackId);
          setTrackInfo(response.body);
        } catch (err) {
          console.log("Something went wrong!", err);
        }
      };

      fetchTrackInfo();
    }

    const fetchIsPlaying = async () => {
      try {
        const response = await spotifyApi.getMyCurrentPlaybackState(
          currentTrackId
        );
        setIsPlaying(response.body?.is_playing ?? false);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    };

    fetchIsPlaying();
  }, [currentTrackId, spotifyApi, isAuthenticated]);

  return trackInfo;
};

export const useSpotifyTogglePlayPause = () => {
  const { spotifyApi } = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [currentTrackId] = useRecoilState(currentTrackIdState);

  const togglePlayPause = async () => {
    try {
      const response = await spotifyApi.getMyCurrentPlaybackState(
        currentTrackId
      );
      setIsPlaying(response.body.is_playing);
    } catch (err) {
      console.log("Something went wrong!", err);
    }

    if (!isPlaying) {
      try {
        await spotifyApi.play();
        setIsPlaying(true);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    } else {
      try {
        await spotifyApi.pause();
        setIsPlaying(false);
      } catch (err) {
        console.log("Something went wrong!", err);
      }
    }
  };

  return { togglePlayPause };
};

export const usePlaySpotifyTrack = () => {
  const { spotifyApi } = useSpotify();
  const [, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [, setIsPlaying] = useRecoilState(isPlayingState);

  const playSpotifyTrack = async (trackId, trackUri) => {
    try {
      await spotifyApi.play({
        uris: [trackUri],
      });
      setIsPlaying(true);
      setCurrentTrackId(trackId);
    } catch (err) {
      console.log("Something went wrong!", err);
    }
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
