import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../../atoms/songAtom";
import useSpotify from "./useSpotify";

const useSpotifyTrackInfo = () => {
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

export default useSpotifyTrackInfo;
